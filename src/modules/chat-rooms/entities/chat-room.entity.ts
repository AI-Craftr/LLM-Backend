import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('chat_rooms')
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  chat_room_id: string;

  @Column({ type: 'uuid' })
  owner_id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at?: Date;
}
