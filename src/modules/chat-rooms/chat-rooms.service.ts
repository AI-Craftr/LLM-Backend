import { Injectable } from '@nestjs/common';
import { ChatRoomsRepository } from './repositories/chat-rooms.repository';
import { ShareLinksRepository } from './repositories/share-links.repository';
import { ChatRoom } from './entities/chat-room.entity';
import { PageOptionsDto } from '@src/common/dtos/page-options.dto';
import { CreateChatRoomDto } from './dtos/create-chat-room.dto';
import { PageMetaDto } from '@src/common/dtos/page-meta.dto';
import { PageDto } from '@src/common/dtos/page.dto';

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

  public async getChatRoomList(ownerId: string, pageOptionsDto: PageOptionsDto) {
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
}
