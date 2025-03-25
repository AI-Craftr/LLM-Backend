import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatMessagesRepository {
  constructor(@InjectRepository(ChatMessage) private chatMessageEntity: Repository<ChatMessage>) {}

  public async fetchChatHistory(ownerId: string, chatRoomId: string): Promise<ChatMessage[]> {
    return this.chatMessageEntity.find({
      where: {
        owner_id: ownerId,
        chat_room_id: chatRoomId,
      },
    });
  }
}
