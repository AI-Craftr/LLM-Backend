import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatMessage } from "./entities/chat-message.entity";
import { CreateMessageInput } from "./interfaces/chat-message.interface";

@Injectable()
export class ChatMessageRepository {
    constructor(
        @InjectRepository(ChatMessage) private readonly chatMessageModel: Repository<ChatMessage>
    ) { }

    create(data: CreateMessageInput) {
        const createChatMessage = this.chatMessageModel.create(data);
        return this.chatMessageModel.save(createChatMessage);
    }

    public async save(data: CreateMessageInput) {
        return this.chatMessageModel.save(data);
    }
}