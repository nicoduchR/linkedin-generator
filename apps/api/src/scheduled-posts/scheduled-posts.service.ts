import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateScheduledPostDto,
  UpdateScheduledPostDto,
} from './dto/scheduled-posts.dto';
import { ScheduledPost } from './entities/scheduled-post.entity';

@Injectable()
export class ScheduledPostsService {
  constructor(
    @InjectRepository(ScheduledPost)
    private scheduledPostRepository: Repository<ScheduledPost>,
  ) {}

  async findAll(): Promise<ScheduledPost[]> {
    return this.scheduledPostRepository.find();
  }

  async findOne(id: string): Promise<ScheduledPost> {
    const post = await this.scheduledPostRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Scheduled post with ID ${id} not found`);
    }
    return post;
  }

  async create(
    createScheduledPostDto: CreateScheduledPostDto,
  ): Promise<ScheduledPost> {
    const newPost = this.scheduledPostRepository.create({
      ...createScheduledPostDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.scheduledPostRepository.save(newPost);
  }

  async update(
    id: string,
    updateScheduledPostDto: UpdateScheduledPostDto,
  ): Promise<ScheduledPost> {
    const post = await this.findOne(id);

    const updatedPost = {
      ...post,
      ...updateScheduledPostDto,
      updatedAt: new Date().toISOString(),
    };

    return this.scheduledPostRepository.save(updatedPost);
  }

  async remove(id: string): Promise<void> {
    const result = await this.scheduledPostRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Scheduled post with ID ${id} not found`);
    }
  }

  async publish(id: string): Promise<ScheduledPost> {
    const post = await this.findOne(id);

    const updatedPost = {
      ...post,
      status: 'published' as const,
      updatedAt: new Date().toISOString(),
    };

    return this.scheduledPostRepository.save(updatedPost);
  }
}
