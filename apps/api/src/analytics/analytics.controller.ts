import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto, CreateEngagementDto } from './dto/analytics.dto';
import { Engagement } from './entities/engagement.entity';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  async getAnalytics(@Query() query: AnalyticsQueryDto): Promise<any> {
    return this.analyticsService.getAnalytics(query);
  }

  @Get('summary')
  async getSummary(): Promise<any> {
    return this.analyticsService.getSummary();
  }

  @Get('engagement')
  async getEngagement(
    @Query() query: AnalyticsQueryDto,
  ): Promise<Engagement[]> {
    return this.analyticsService.getEngagement(query);
  }

  @Get('trends')
  async getTrends(@Query() query: AnalyticsQueryDto): Promise<any> {
    return this.analyticsService.getTrends(query);
  }

  @Get('posts/:id')
  async getPostAnalytics(@Param('id') id: string): Promise<any> {
    return this.analyticsService.getPostAnalytics(id);
  }

  @Post('engagement')
  async createEngagement(
    @Body() createEngagementDto: CreateEngagementDto,
  ): Promise<Engagement> {
    return this.analyticsService.createEngagement(createEngagementDto);
  }
}
