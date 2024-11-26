import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRoomsRepository } from './repositories/chat-rooms.repository';
import { ShareLinksRepository } from './repositories/share-links.repository';
import { ChatRoom } from './entities/chat-room.entity';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { CreateChatRoomDto } from './dtos/create-chat-room.dto';
import { PageMetaDto } from '@src/common/dtos/page-meta.dto';
import { PageDto } from '@src/common/dtos/page.dto';
import { UpdateChatRoomDto } from './dtos/update-chat-room.dto';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';

@Injectable()
export class ChatRoomsService {
  constructor(
    private chatRoomsRepository: ChatRoomsRepository,
    private shareLinksRepository: ShareLinksRepository,
  ) {}

  public async createChatRoom(ownerId: string, createChatRoomDto: CreateChatRoomDto): Promise<{ chat_room: ChatRoom }> {
    // Create a record chat room in database
    const chatRoom = await this.chatRoomsRepository.create({
      title: createChatRoomDto?.title,
      owner_id: ownerId,
    });

    return {
      chat_room: chatRoom,
    };
  }

  public async getChatRoomList(ownerId: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<ChatRoom>> {
    const queryBuilder = this.chatRoomsRepository.createQueryBuilder('chat_rooms');
    queryBuilder
      .orderBy('chat_rooms.created_at', pageOptionsDto.order)
      .where('chat_rooms.owner_id = :ownerId', { ownerId })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  public async updateChatRoom(chatRoomId: string, updateChatRoomDto: UpdateChatRoomDto): Promise<{ message: string }> {
    // Check exist chat room
    const chatRoom = await this.chatRoomsRepository.findOneBy({ chat_room_id: chatRoomId });
    if (!chatRoom) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_CHAT_ROOM);
    }

    await this.chatRoomsRepository.updateOne(chatRoomId, updateChatRoomDto);

    return {
      message: ResponseMessages.CHAT_ROOM_UPDATED_SUCCESS,
    };
  }

  public async deleteChatRoom(chatRoomId: string): Promise<{ message: string }> {
    const [chatRoom] = await Promise.all([
      this.chatRoomsRepository.findOneBy({ chat_room_id: chatRoomId }),
      this.chatRoomsRepository.deleteByChatRoomId(chatRoomId),
    ]);

    if (!chatRoom) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_CHAT_ROOM);
    }

    return {
      message: ResponseMessages.CHAT_ROOM_DELETED_SUCCESS,
    };
  }
}
