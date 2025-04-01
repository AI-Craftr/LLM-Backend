import { Module } from '@nestjs/common';
import { providers } from './langchain.provider';
import { ChatRoomsModule } from '../chat-rooms/chat-rooms.module';
import { CHAT_HISTORY_SERVICE } from './constants';
import { ChatMessagesModule } from '../chat-messages/chat-messages.module';

@Module({
  imports: [ChatRoomsModule, ChatMessagesModule],
  providers,
  exports: [CHAT_HISTORY_SERVICE],
})
export class LangchainMoule {}
