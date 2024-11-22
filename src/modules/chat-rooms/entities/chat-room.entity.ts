import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat_rooms')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  chat_room_id: string;

  @Column({ type: 'uuid' })
  owner_id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;
}
