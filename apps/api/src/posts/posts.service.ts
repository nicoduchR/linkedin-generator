import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: string): Promise<Post> {
    const where: FindOptionsWhere<Post> = { id };
    const post = await this.postRepository.findOne({ where });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new Post();
    Object.assign(newPost, createPostDto);

    return this.postRepository.save(newPost);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const existingPost = await this.findOne(id);

    Object.assign(existingPost, updatePostDto);

    return this.postRepository.save(existingPost);
  }

  async remove(id: string): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
  }
}
