import { ApiTags } from '@nestjs/swagger';
import { Controller, UseInterceptors } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { TransformInterceptor } from '@src/common/interceptors';

@ApiTags('Chat_Rooms')
@UseInterceptors(TransformInterceptor)
@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private chatRoomsService: ChatRoomsService) {}
}
