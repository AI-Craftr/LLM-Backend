import { ChatMessage } from "../entities/chat-message.entity";
import { ChatMessageInput } from "../types";

export interface IChatMessageRepository {
    create(chatMessage: ChatMessageInput): Promise<ChatMessage>;
}