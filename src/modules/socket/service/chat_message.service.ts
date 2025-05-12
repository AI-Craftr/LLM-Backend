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
import { ChatRoomsRepository } from "@src/modules/chat-rooms/repositories/chat-rooms.repository";
import { AgentsService } from "./agents.service";
import { UsersRepository } from "@src/modules/users/users.repository";
import { ChatMessageRepository } from "@src/modules/chat-messages/chat-messages.repository";

@Injectable()
export class ChatMessageService {
    private readonly ttl: number = 1.2096e9; // 2 weeks in milliseconds

    constructor(
        private readonly devLogger: DevLoggerService,
        private readonly agentsService: AgentsService,
        private readonly chatRoomsRepository: ChatRoomsRepository,
        private readonly chatMessageRepository: ChatMessageRepository,
        private readonly usersRepository: UsersRepository,
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
            } else {
                await this.handleUserMessage(value, socket);
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

    private async handleUserMessage(data: CreateMessageDto, socket: Socket): Promise<void> {
        const userId = socket.data.userId;
        const { chat_room_id, user_prompt } = data;

        try {
            let [chatRoom, user] = await Promise.all([
                this.chatRoomsRepository.findOneBy({ _id: chat_room_id  }),
                this.usersRepository.findOneBy({ _id: userId })
            ])

            if (!chatRoom) {
                chatRoom = await this.chatRoomsRepository.create({
                    title: user_prompt,
                    user_id: user._id
                })
            };

            const stream = this.agentsService.streamChat(user_prompt);

            let fullResponse: string = "";

            for await (const chunk of stream) {
                fullResponse += chunk;
                socket.emit("ai_response", chunk);
            }

            await this.chatMessageRepository.create({
                user_id: user._id,
                chat_room_id: chatRoom._id,
                user_prompt,
                response: fullResponse,
                resource_url: "",
                status: StatusEnum.ANSWERED
            });
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            this.devLogger.error(errorMessage, null, 'PROCESS_AUTHENTICATED_MODE_MESSAGE');
        }
    }
}