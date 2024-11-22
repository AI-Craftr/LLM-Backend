import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('share_link')
export class ShareLink extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  share_link_id: string;

  @Column('uuid')
  chat_room_id: string;

  @Column('uuid')
  current_message_id: string;

  @Column('varchar')
  share_url: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at?: Date;
}
