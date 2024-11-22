import { ApiTags } from '@nestjs/swagger';
import { Controller, UseInterceptors } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { TransformInterceptor } from '@src/common/interceptors';

@ApiTags('Chat_Messages')
@UseInterceptors(TransformInterceptor)
@Controller('chat-messages')
export class ChatMessagesController {
  constructor(private chatMessagesService: ChatMessagesService) {}
}
