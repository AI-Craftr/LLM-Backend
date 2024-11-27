import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { TransformInterceptor } from '@src/common/interceptors';
import { GetUser } from '@src/common/decorators';
import { ApiCreateChatRoom } from './docs/create-chat-room.doc';
import { CreateChatRoomDto } from './dtos/create-chat-room.dto';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { LoggerService } from '../logger/logger.service';
import { PageDto } from '@src/common/dtos/page.dto';
import { ChatRoom } from './entities/chat-room.entity';
import { UpdateChatRoomDto } from './dtos/update-chat-room.dto';
import { ApiGetChatRoomList } from './docs/get-chat-room.doc';
import { ApiUpdateChatRoom } from './docs/update-chat-room.doc';
import { ApiDeleteChatRoom } from './docs/delete-chat-room.doc';

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
  public createChatRoom(
    @GetUser('user_id') userId: string,
    @Body() createChatRoomDto: CreateChatRoomDto,
  ): Promise<{ chat_room: ChatRoom }> {
    this.logger.log('Called create chat room', ChatRoomsController.name);
    return this.chatRoomsService.createChatRoom(userId, createChatRoomDto);
  }

  @ApiGetChatRoomList()
  @Get()
  public getChatRoomList(
    @GetUser('user_id') userId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ChatRoom>> {
    this.logger.log('Called get chat room list', ChatRoomsController.name);
    return this.chatRoomsService.getChatRoomList(userId, pageOptionsDto);
  }

  @ApiUpdateChatRoom()
  @Patch(':chat_room_id')
  public updateChatRoom(
    @Param('chat_room_id', ParseUUIDPipe) chatRoomId: string,
    @Body() updateChatRoomDto: UpdateChatRoomDto,
  ): Promise<{ message: string }> {
    this.logger.log('Called update chat room', ChatRoomsController.name);
    return this.chatRoomsService.updateChatRoom(chatRoomId, updateChatRoomDto);
  }

  @ApiDeleteChatRoom()
  @Delete(':chat_room_id')
  public deleteChatRoom(@Param('chat_room_id', ParseUUIDPipe) chatRoomId: string) {
    this.logger.log('Called delete chat room', ChatRoomsController.name);
    return this.chatRoomsService.deleteChatRoom(chatRoomId);
  }
}
