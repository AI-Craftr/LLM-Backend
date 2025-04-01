import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage, StatusEnum } from './entities/chat-message.entity';

@Injectable()
export class ChatMessagesRepository {
  constructor(@InjectRepository(ChatMessage) private chatMessageEntity: Repository<ChatMessage>) {}

  public async createMessage(chatRoomId:string, ownerId:string, userPrompt:string): Promise<ChatMessage> {
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
}
