import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('anecdotes')
export class Anecdote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', name: 'anecdote_date' })
  date: string;

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];

  @Column({ default: false })
  favorite?: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
