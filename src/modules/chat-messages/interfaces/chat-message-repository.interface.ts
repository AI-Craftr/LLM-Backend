import { ChatMessage } from "../entities/chat-message.entity";

export interface IChatMessageRepository {
    create(chatRoomId: string, ownerId: string, userPrompt: string): Promise<ChatMessage>;
    update(chatMessageId: string, response: string, status: string);
    findOne(chatMessageId:string): Promise<ChatMessage>;
    findRoom(chatRoomId:string): Promise<ChatMessage>;
    remove(chatMessageId:string);
}