import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', name: 'post_date' })
  date: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  comments: number;

  @Column({
    type: 'enum',
    enum: ['draft', 'published', 'scheduled'],
    default: 'draft',
  })
  status: 'draft' | 'published' | 'scheduled';

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  engagement: 'low' | 'medium' | 'high';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
