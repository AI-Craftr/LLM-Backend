import { Injectable } from '@nestjs/common';
import { ChatMessagesRepository } from './chat-messages.repository';
import { ChatMessage } from './entities/chat-message.entity';

@Injectable()
export class ChatMessagesService {
  constructor(private chatMessagesRepository: ChatMessagesRepository) {}

  public async sendMessage(chatRoomId:string, ownerId:string, userPrompt:string): Promise<ChatMessage> {
    const sendMessage = await this.chatMessagesRepository.createMessage(chatRoomId, ownerId, userPrompt);
    return sendMessage;
  }
}
