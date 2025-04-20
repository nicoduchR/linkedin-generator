import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ScheduledPostsService } from './scheduled-posts.service';
import {
  CreateScheduledPostDto,
  UpdateScheduledPostDto,
} from './dto/scheduled-posts.dto';
import { ScheduledPost } from './entities/scheduled-post.entity';

@Controller('scheduled-posts')
export class ScheduledPostsController {
  constructor(private readonly scheduledPostsService: ScheduledPostsService) {}

  @Get()
  async findAll(): Promise<ScheduledPost[]> {
    return this.scheduledPostsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ScheduledPost> {
    return this.scheduledPostsService.findOne(id);
  }

  @Post()
  async create(
    @Body() createScheduledPostDto: CreateScheduledPostDto,
  ): Promise<ScheduledPost> {
    return this.scheduledPostsService.create(createScheduledPostDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduledPostDto: UpdateScheduledPostDto,
  ): Promise<ScheduledPost> {
    return this.scheduledPostsService.update(id, updateScheduledPostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.scheduledPostsService.remove(id);
  }

  @Post(':id/publish')
  async publish(@Param('id') id: string): Promise<ScheduledPost> {
    return this.scheduledPostsService.publish(id);
  }
}
