import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AnecdotesModule } from './anecdotes/anecdotes.module';
import { ScheduledPostsModule } from './scheduled-posts/scheduled-posts.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ScrapersModule } from './scrapers/scrapers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    PostsModule,
    AnecdotesModule,
    ScheduledPostsModule,
    AnalyticsModule,
    ScrapersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
