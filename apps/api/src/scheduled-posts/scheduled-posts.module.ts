import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledPostsController } from './scheduled-posts.controller';
import { ScheduledPostsService } from './scheduled-posts.service';
import { ScheduledPost } from './entities/scheduled-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduledPost])],
  controllers: [ScheduledPostsController],
  providers: [ScheduledPostsService],
  exports: [ScheduledPostsService],
})
export class ScheduledPostsModule {}
