import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoomsRepository } from './repositories/chat-rooms.repository';
import { ShareLinksRepository } from './repositories/share-links.repository';
import { CreateChatRoomDto } from './dtos/create-chat-room.dto';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';

@Injectable()
export class ChatRoomsService {
  constructor(
    private chatRoomsRepository: ChatRoomsRepository,
    private shareLinksRepository: ShareLinksRepository,
  ) {}

  public async createChatRoom(ownerId: string, createChatRoomDto: CreateChatRoomDto) {
    // Create a record chat room in database
    const chatRoom = await this.chatRoomsRepository.create({
      title: createChatRoomDto.title,
      owner_id: ownerId,
    });

    return {
      chat_room: chatRoom,
    };
  }
}
