import { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../entities/chat-room.entity';
import { CreateChatRoomInput } from '../interfaces/create-chat-room-input.interface';

@Injectable()
export class ChatRoomsRepository {
  constructor(@InjectRepository(ChatRoom) private chatRoomEntity: Repository<ChatRoom>) {}

  public findOneBy(where: FindOptionsWhere<ChatRoom> | FindOptionsWhere<ChatRoom>[]): Promise<ChatRoom> {
    return this.chatRoomEntity.findOneBy(where);
  }

  public create(chatRoom: CreateChatRoomInput): Promise<ChatRoom> {
    const newChatRoom = this.chatRoomEntity.create({
      title: chatRoom.title,
      owner_id: chatRoom.owner_id,
    });
    return this.chatRoomEntity.save(newChatRoom);
  }
}
