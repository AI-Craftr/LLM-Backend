import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum StatusEnum {
  ANSWERED = 'answered',
  ASKED = 'asked',
  FAILURE = 'failure',
  CANCELLED = 'cancelled',
}

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  chat_message_id: string;

  @Column('uuid')
  chat_room_id: string;

  @Column('uuid')
  owner_id: string;

  @Column({ type: 'varchar' })
  user_prompt: string;

  @Column({ type: 'varchar' })
  response: string;

  @Column({ type: 'varchar', enum: [StatusEnum.ASKED, StatusEnum.ANSWERED, StatusEnum.CANCELLED, StatusEnum.FAILURE] })
  status: StatusEnum;

  @Column({ type: 'varchar' })
  resource_url: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at?: Date;
}
