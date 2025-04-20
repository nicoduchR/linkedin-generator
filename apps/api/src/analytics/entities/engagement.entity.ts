import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('engagements')
export class Engagement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id' })
  postId: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  comments: number;

  @Column({ default: 0 })
  shares: number;

  @Column({ default: 0 })
  clicks: number;

  @Column({ default: 0 })
  impressions: number;

  @Column({ type: 'date' })
  date: string;

  @Column({
    type: 'enum',
    enum: ['linkedin', 'twitter', 'facebook'],
    default: 'linkedin',
  })
  platform: 'linkedin' | 'twitter' | 'facebook';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
