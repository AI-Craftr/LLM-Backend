import { Module } from '@nestjs/common';
import { providers } from './langchain.provider';
import { ChatRoomsModule } from '../chat-rooms/chat-rooms.module';
import { CHAT_HISTORY_SERVICE } from './constants';

@Module({
  imports: [ChatRoomsModule],
  providers,
  exports: [CHAT_HISTORY_SERVICE],
})
export class LangchainMoule {}
