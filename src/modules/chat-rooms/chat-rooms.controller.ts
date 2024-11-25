import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { TransformInterceptor } from '@src/common/interceptors';
import { CreateChatRoomDto } from './dtos/create-chat-room.dto';
import { GetUser } from '@src/common/decorators';
import { ApiCreateChatRoom } from './docs/create-chat-room.doc';

@ApiTags('Chat_Rooms')
@UseInterceptors(TransformInterceptor)
@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(private chatRoomsService: ChatRoomsService) {}

  @ApiCreateChatRoom()
  @Post()
  public createChatRoom(@GetUser('user_id') userId: string, @Body() createChatRoomDto: CreateChatRoomDto) {
    console.log({ createChatRoomDto });
    return this.chatRoomsService.createChatRoom(userId, createChatRoomDto);
  }
}
