import { Provider } from '@nestjs/common';
import * as TOKENS from './constants/tokens.constant';
import { ChatHistoryService } from './services/chat-history.service';

export const providers: Provider[] = [
  {
    provide: TOKENS.CHAT_HISTORY_SERVICE,
    useClass: ChatHistoryService,
  },
];
