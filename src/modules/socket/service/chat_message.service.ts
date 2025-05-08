import { Socket } from "socket.io";
import { Cache } from "cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CreateMessageDto } from "@src/modules/chat-messages/dtos/create-message.dto";
import { DevLoggerService } from "@src/modules/logger/dev_logger.service";
import { getErrorMessage } from "@src/common/utils/get_error_message.util";
import { SocketKeys } from "@src/common/constants/socket.keys";
import { StatusEnum } from "@src/common/enums/status.enum";
import { createMessageValidator } from "../validator/create-message.validator";
import { AgentsService } from "./agents.service";

@Injectable()
export class ChatMessageService {
    private readonly ttl: number = 1.2096e9; // 2 weeks in milliseconds

    constructor(
        private readonly agentsService: AgentsService,
        private readonly devLogger: DevLoggerService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) { }

    public async createMessage(data: CreateMessageDto, socket: Socket): Promise<void | null> {
        try {
            const { isTemporaryUser, fingerprintId } = socket.data || {};
            const socketRoom = isTemporaryUser ? fingerprintId : data?.chat_room_id;

            socket.join(socketRoom);

            const { value, error } = createMessageValidator.validate(data);

            if (error) {
                console.log(error);
            }

            if (isTemporaryUser) {
                await this.handleGuestModeMessage(value.user_prompt, socket)
            }
        } catch (error) {
            this.devLogger.error(getErrorMessage(error), null, SocketKeys.CREATE_MESSAGE);
        }
    }

    private async handleGuestModeMessage(userPrompt: string, socket: Socket) {
        const fingerprintId: string = socket.data.fingerprintId;

        await this.processGuestModeMessage(userPrompt, fingerprintId, socket);
    }

    private async processGuestModeMessage(userPrompt: string, fingerprintId: string, socket:Socket): Promise<void> {
        const cacheKey = `message-${fingerprintId}`;

        const initialMessage = {
            user_prompt: userPrompt,
            status: StatusEnum.ASKED,
            response: null,
        };

        try {
            await this.cacheManager.set(cacheKey, JSON.stringify(initialMessage), this.ttl);

            const stream = this.agentsService.streamChat(userPrompt);

            let fullResponse = "";
            for await (const chunk of stream) {
                fullResponse += chunk;
                socket.emit("ai_response", chunk);
            }

            const finalMessage = {
                ...initialMessage,
                status: StatusEnum.ANSWERED,
                response: fullResponse
            }

            await this.cacheManager.set(cacheKey, JSON.stringify(finalMessage), this.ttl);

        } catch (error) {
            this.devLogger.error(getErrorMessage(error), null, `GUEST_MESSAGE_PROCESS_${fingerprintId}`);

        }
    }
}