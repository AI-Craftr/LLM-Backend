import { ChatMessage } from "../entities/chat-message.entity";
import { ChatMessageInput } from "../types";

export interface IChatMessageRepository {
    create(chatMessage: ChatMessageInput): Promise<ChatMessage>;
    update(chatMessageId: string, response: string, status: string): Promise<ChatMessage>;
}