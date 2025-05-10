import { StatusEnum } from '@src/common/enums/status.enum';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  chat_room_id: string;

  @Column('uuid')
  user_id: string;

  @Column({ type: 'varchar' })
  user_prompt: string;

  @Column({ type: 'varchar' })
  response: string;

  @Column({ type: 'varchar', enum: [StatusEnum.ASKED, StatusEnum.ANSWERED, StatusEnum.CANCELLED, StatusEnum.FAILURE] })
  status: StatusEnum;

  @Column({ type: 'text', default: null })
  function_name: string;

  @Column({ type: 'varchar' })
  resource_url: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at?: Date;
}
