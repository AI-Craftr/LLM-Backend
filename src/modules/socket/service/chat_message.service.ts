import { Injectable } from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { Socket } from "socket.io";
import { CreateMessageDto } from "@src/modules/chat-messages/dtos/create-message.dto";
import { DevLoggerService } from "@src/modules/logger/dev_logger.service";
import { getErrorMessage } from "@src/common/utils/get_error_message.util";
import { SocketKeys } from "@src/common/constants/socket.keys";

@Injectable()
export class ChatMessageService {
    constructor(
        private readonly agentsService: AgentsService,
        private readonly devLogger: DevLoggerService
    ) { }

    public async createMessage(data: CreateMessageDto, socket: Socket): Promise<void | null> {
        try {
            const stream = this.agentsService.streamChat(data.user_prompt);
            
            for await (const chunk of stream) {
                socket.emit("ai_response", chunk);                
            }
        } catch (error) {
            this.devLogger.error(getErrorMessage(error), null, SocketKeys.CREATE_MESSAGE);
        }
    }
}