import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scheduled_posts')
export class ScheduledPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'date', name: 'scheduled_date' })
  scheduledDate: string;

  @Column({ name: 'scheduled_time' })
  scheduledTime: string;

  @Column({
    type: 'enum',
    enum: ['scheduled', 'draft', 'published', 'failed'],
    default: 'draft',
  })
  status: 'scheduled' | 'draft' | 'published' | 'failed';

  @Column({
    type: 'enum',
    enum: ['linkedin', 'twitter', 'facebook'],
    default: 'linkedin',
  })
  platform: 'linkedin' | 'twitter' | 'facebook';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
