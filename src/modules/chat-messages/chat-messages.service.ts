import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatMessagesRepository } from './chat-messages.repository';
import { ChatMessage, StatusEnum } from './entities/chat-message.entity';
import { ChatMessageEnum } from '@src/common/message/message.enum';

@Injectable()
export class ChatMessagesService {
  constructor(private chatMessagesRepository: ChatMessagesRepository) {}

  public async sendMessage(chatRoomId:string, ownerId:string, userPrompt:string): Promise<ChatMessage> {
    const sendMessage = await this.chatMessagesRepository.createMessage(chatRoomId, ownerId, userPrompt);
    return sendMessage;
  }

  public async updateMessageResponse(chatMessageId:string, response:string, status:StatusEnum) {
    await this.ensureMessageExist(chatMessageId);
    return this.chatMessagesRepository.update(chatMessageId, response, status);
  }
  
  public async getChatMessages(chatRoomId:string): Promise<ChatMessage> {
    return this.chatMessagesRepository.findRoom(chatRoomId);
  }

  public async ensureMessageExist(chatMessageId:string) {
    const chatMessage = await this.chatMessagesRepository.findOne(chatMessageId);
    if (!chatMessage) throw new NotFoundException(ChatMessageEnum.CHAT_MESSAGE_NOTFOUND);
    return chatMessage
  }
}