import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage, StatusEnum } from './entities/chat-message.entity';
import { IChatMessageRepository } from './interfaces/chat-message-repository.interface';

@Injectable()
export class ChatMessagesRepository implements IChatMessageRepository {
  constructor(@InjectRepository(ChatMessage) private chatMessageEntity: Repository<ChatMessage>) { }

  public async create(chatRoomId: string, ownerId: string, userPrompt: string): Promise<ChatMessage> {
    const chatMessage = this.chatMessageEntity.create({
      chat_message_id: chatRoomId,
      owner_id: ownerId,
      user_prompt: userPrompt,
      response: "",
      status: StatusEnum.ASKED,
      resource_url: ""
    });

    return await this.chatMessageEntity.save(chatMessage);
  }

  public async findOne(chatMessageId: string): Promise<ChatMessage> {
    return this.chatMessageEntity.findOne({ where: { chat_message_id: chatMessageId } });
  }

  public async update(chatMessageId: string, response: string, status: StatusEnum) {
    return this.chatMessageEntity.update(chatMessageId, {
      response,
      status
    })
  }

  public async findRoom(chatRoomId: string): Promise<ChatMessage> {
    return this.chatMessageEntity.findOne({ where: { chat_message_id: chatRoomId } });
  }

  public async remove(chatMessageId: string) {
    return this.chatMessageEntity.delete(chatMessageId)
  }
}
