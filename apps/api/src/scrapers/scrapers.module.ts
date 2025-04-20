import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapersController } from './scrapers.controller';
import { ScrapersService } from './scrapers.service';
import { PostsModule } from '../posts/posts.module';
import { ScraperJob } from './entities/scraper-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScraperJob]), PostsModule],
  controllers: [ScrapersController],
  providers: [ScrapersService],
  exports: [ScrapersService],
})
export class ScrapersModule {}
