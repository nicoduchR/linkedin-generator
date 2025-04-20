import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { AnalyticsQueryDto, CreateEngagementDto } from './dto/analytics.dto';
import { Engagement } from './entities/engagement.entity';

// Define type for platform
type PlatformType = 'linkedin' | 'twitter' | 'facebook';

// Define interface for where clause
interface EngagementWhereClause {
  date?: any;
  platform?: PlatformType;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Engagement)
    private engagementRepository: Repository<Engagement>,
  ) {}

  async getAnalytics(query: AnalyticsQueryDto): Promise<any> {
    const { startDate, endDate, platform } = query;

    // Build the where clause
    const whereClause: EngagementWhereClause = {};

    if (startDate && endDate) {
      whereClause.date = Between(startDate, endDate);
    } else if (startDate) {
      whereClause.date = MoreThanOrEqual(startDate);
    } else if (endDate) {
      whereClause.date = LessThanOrEqual(endDate);
    }

    if (platform) {
      whereClause.platform = platform;
    }

    // Get engagements
    const engagements = await this.engagementRepository.find({
      where: whereClause,
    });

    // Calculate totals
    const totalLikes = engagements.reduce((sum, item) => sum + item.likes, 0);
    const totalComments = engagements.reduce(
      (sum, item) => sum + item.comments,
      0,
    );
    const totalShares = engagements.reduce((sum, item) => sum + item.shares, 0);
    const totalClicks = engagements.reduce((sum, item) => sum + item.clicks, 0);
    const totalImpressions = engagements.reduce(
      (sum, item) => sum + item.impressions,
      0,
    );

    return {
      totalLikes,
      totalComments,
      totalShares,
      totalClicks,
      totalImpressions,
      engagementRate:
        totalImpressions > 0
          ? ((totalLikes + totalComments + totalShares) / totalImpressions) *
            100
          : 0,
      clickThroughRate:
        totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      data: engagements,
    };
  }

  async getSummary(): Promise<any> {
    // Get all engagements
    const engagements = await this.engagementRepository.find();

    // Get unique post IDs
    const totalPosts = new Set(engagements.map((item) => item.postId)).size;

    // Calculate totals
    const totalEngagements = engagements.reduce(
      (sum, item) => sum + item.likes + item.comments + item.shares,
      0,
    );
    const totalImpressions = engagements.reduce(
      (sum, item) => sum + item.impressions,
      0,
    );

    // Count engagements by platform
    const linkedinCount = engagements.filter(
      (item) => item.platform === 'linkedin',
    ).length;
    const twitterCount = engagements.filter(
      (item) => item.platform === 'twitter',
    ).length;
    const facebookCount = engagements.filter(
      (item) => item.platform === 'facebook',
    ).length;

    return {
      totalPosts,
      totalEngagements,
      totalImpressions,
      averageEngagementPerPost:
        totalPosts > 0 ? totalEngagements / totalPosts : 0,
      platforms: {
        linkedin: linkedinCount,
        twitter: twitterCount,
        facebook: facebookCount,
      },
    };
  }

  async getEngagement(query: AnalyticsQueryDto): Promise<Engagement[]> {
    const { startDate, endDate, platform } = query;

    // Build the where clause
    const whereClause: EngagementWhereClause = {};

    if (startDate && endDate) {
      whereClause.date = Between(startDate, endDate);
    } else if (startDate) {
      whereClause.date = MoreThanOrEqual(startDate);
    } else if (endDate) {
      whereClause.date = LessThanOrEqual(endDate);
    }

    if (platform) {
      whereClause.platform = platform;
    }

    return this.engagementRepository.find({
      where: whereClause,
    });
  }

  async getTrends(query: AnalyticsQueryDto): Promise<any> {
    const engagements = await this.getEngagement(query);

    // Define the type for aggregated data
    interface DailyStats {
      date: string;
      likes: number;
      comments: number;
      shares: number;
      clicks: number;
      impressions: number;
    }

    // Group by date
    const groupedByDate = engagements.reduce<Record<string, DailyStats>>(
      (acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = {
            date: item.date,
            likes: 0,
            comments: 0,
            shares: 0,
            clicks: 0,
            impressions: 0,
          };
        }

        acc[item.date].likes += item.likes;
        acc[item.date].comments += item.comments;
        acc[item.date].shares += item.shares;
        acc[item.date].clicks += item.clicks;
        acc[item.date].impressions += item.impressions;

        return acc;
      },
      {},
    );

    return Object.values(groupedByDate);
  }

  async getPostAnalytics(postId: string): Promise<any> {
    const postEngagements = await this.engagementRepository.find({
      where: { postId },
    });

    if (postEngagements.length === 0) {
      return {
        postId,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
        totalClicks: 0,
        totalImpressions: 0,
        engagementRate: 0,
        clickThroughRate: 0,
        dailyStats: [],
      };
    }

    const totalLikes = postEngagements.reduce(
      (sum, item) => sum + item.likes,
      0,
    );
    const totalComments = postEngagements.reduce(
      (sum, item) => sum + item.comments,
      0,
    );
    const totalShares = postEngagements.reduce(
      (sum, item) => sum + item.shares,
      0,
    );
    const totalClicks = postEngagements.reduce(
      (sum, item) => sum + item.clicks,
      0,
    );
    const totalImpressions = postEngagements.reduce(
      (sum, item) => sum + item.impressions,
      0,
    );

    // Define the type for daily statistics
    interface DailyStats {
      date: string;
      likes: number;
      comments: number;
      shares: number;
      clicks: number;
      impressions: number;
    }

    // Group by date for daily stats
    const groupedByDate = postEngagements.reduce<Record<string, DailyStats>>(
      (acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = {
            date: item.date,
            likes: 0,
            comments: 0,
            shares: 0,
            clicks: 0,
            impressions: 0,
          };
        }

        acc[item.date].likes += item.likes;
        acc[item.date].comments += item.comments;
        acc[item.date].shares += item.shares;
        acc[item.date].clicks += item.clicks;
        acc[item.date].impressions += item.impressions;

        return acc;
      },
      {},
    );

    return {
      postId,
      totalLikes,
      totalComments,
      totalShares,
      totalClicks,
      totalImpressions,
      engagementRate:
        totalImpressions > 0
          ? ((totalLikes + totalComments + totalShares) / totalImpressions) *
            100
          : 0,
      clickThroughRate:
        totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      dailyStats: Object.values(groupedByDate),
    };
  }

  async createEngagement(
    createEngagementDto: CreateEngagementDto,
  ): Promise<Engagement> {
    const newEngagement = this.engagementRepository.create({
      ...createEngagementDto,
      shares: createEngagementDto.shares || 0,
      clicks: createEngagementDto.clicks || 0,
      impressions: createEngagementDto.impressions || 0,
    });

    return this.engagementRepository.save(newEngagement);
  }
}
