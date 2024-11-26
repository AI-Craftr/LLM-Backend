import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { TransformInterceptor } from '@src/common/interceptors';
import { GetUser } from '@src/common/decorators';
import { ApiCreateChatRoom } from './docs/create-chat-room.doc';
import { CreateChatRoomDto } from './dtos/create-chat-room.dto';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { LoggerService } from '../logger/logger.service';

@ApiTags('Chat_Rooms')
@UseInterceptors(TransformInterceptor)
@Controller('chat-rooms')
export class ChatRoomsController {
  constructor(
    private logger: LoggerService,
    private chatRoomsService: ChatRoomsService,
  ) {}

  @ApiCreateChatRoom()
  @Post()
  public createChatRoom(@GetUser('user_id') userId: string, @Body() createChatRoomDto: CreateChatRoomDto) {
    this.logger.log('Called create chat room', ChatRoomsController.name);
    return this.chatRoomsService.createChatRoom(userId, createChatRoomDto);
  }

  @Get()
  public getChatRoomList(@GetUser('user_id') userId: string, @Query() pageOptionsDto: PageOptionsDto) {
    this.logger.log('Called get chat room list', ChatRoomsController.name);
    return this.chatRoomsService.getChatRoomList(userId, pageOptionsDto);
  }
}
