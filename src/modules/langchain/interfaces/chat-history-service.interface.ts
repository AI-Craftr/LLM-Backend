import { HumanMessage, AIMessage } from '@langchain/core/messages';

export interface IChatHistoryService {
  getChatHistory(ownerId: string, chatRoomId: string): Promise<(HumanMessage | AIMessage)[]>;
}
