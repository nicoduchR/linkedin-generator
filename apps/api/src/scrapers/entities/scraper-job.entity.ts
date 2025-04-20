import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scraper_jobs')
export class ScraperJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'external_job_id' })
  externalJobId: string;

  @Column({ name: 'profile_url' })
  profileUrl: string;

  @Column({ type: 'date', name: 'start_date', nullable: true })
  startDate?: string;

  @Column({ type: 'date', name: 'end_date', nullable: true })
  endDate?: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending',
  })
  status: 'pending' | 'processing' | 'completed' | 'failed';

  @Column({ nullable: true })
  error?: string;

  @Column({ name: 'posts_saved', default: 0 })
  postsSaved: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
