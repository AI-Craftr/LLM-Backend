import { FindManyOptions, FindOptionsWhere, QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRoom } from '../entities/chat-room.entity';
import { CreateChatRoomInput } from '../interfaces/create-chat-room-input.interface';
import { UpdateChatRoomInput } from '../interfaces/update-chat-room.interface';

@Injectable()
export class ChatRoomsRepository {
  constructor(@InjectRepository(ChatRoom) private chatRoomEntity: Repository<ChatRoom>) {}

  public findOneBy(where: FindOptionsWhere<ChatRoom> | FindOptionsWhere<ChatRoom>[]): Promise<ChatRoom> {
    return this.chatRoomEntity.findOneBy(where);
  }

  public create(chatRoom: CreateChatRoomInput): Promise<ChatRoom> {
    const newChatRoom = this.chatRoomEntity.create({
      title: chatRoom?.title ?? '',
      owner_id: chatRoom.owner_id,
    });
    return this.chatRoomEntity.save(newChatRoom);
  }

  public findMany(options?: FindManyOptions<ChatRoom>) {
    return this.chatRoomEntity.find(options);
  }

  public createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<ChatRoom> {
    return this.chatRoomEntity.createQueryBuilder(alias, queryRunner);
  }

  public updateOne(chatRoomId: string, input: UpdateChatRoomInput) {
    return this.chatRoomEntity.update({ chat_room_id: chatRoomId }, { title: input.title });
  }
}
