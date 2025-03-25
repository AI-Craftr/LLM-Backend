import { Injectable } from '@nestjs/common';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { copyObject, isEqual } from '@src/common/utils';
import { ChatMessagesRepository } from '@src/modules/chat-messages/chat-messages.repository';
import { ChatMessage, StatusEnum } from '@src/modules/chat-messages/entities/chat-message.entity';
import { IChatHistoryService } from '../interfaces/chat-history-service.interface';

@Injectable()
export class ChatHistoryService implements IChatHistoryService {
  constructor(private chatMessagesRepository: ChatMessagesRepository) {}

  public async getChatHistory(ownerId: string, chatRoomId: string): Promise<(HumanMessage | AIMessage)[]> {
    const chatHistory = await this.chatMessagesRepository.fetchChatHistory(ownerId, chatRoomId);
    return this.transformChatHistory(chatHistory);
  }

  public async transformChatHistory(chatHistory: ChatMessage[]): Promise<(HumanMessage | AIMessage)[]> {
    const messages: (HumanMessage | AIMessage)[] = [];

    for (const message of copyObject(chatHistory)) {
      const isStateAnswered: boolean = this.isStateAnswered(message);
      const hasUserPrompt: boolean = this.hasUserPrompt(message);
      const hasResponse: boolean = this.hasResponse(message);

      if (isStateAnswered && hasUserPrompt && hasResponse) {
        const humanMessage: HumanMessage = new HumanMessage(message?.user_prompt);
        const aIMessage: AIMessage = new AIMessage(message?.response);
        messages.push(humanMessage, aIMessage);
      }
    }

    return messages;
  }

  private isStateAnswered(message: ChatMessage): boolean {
    return isEqual(message.status, StatusEnum.ANSWERED);
  }

  private hasUserPrompt(message: ChatMessage): boolean {
    return !!message?.user_prompt;
  }

  private hasResponse(message: ChatMessage): boolean {
    return !!message?.response;
  }
}
