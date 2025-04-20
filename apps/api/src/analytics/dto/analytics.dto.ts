export class AnalyticsQueryDto {
  startDate?: string;
  endDate?: string;
  platform?: 'linkedin' | 'twitter' | 'facebook';
  metric?: 'engagement' | 'impressions' | 'clicks' | 'all';
}

export class CreateEngagementDto {
  postId: string;
  likes: number;
  comments: number;
  shares?: number;
  clicks?: number;
  impressions?: number;
  date: string;
  platform: 'linkedin' | 'twitter' | 'facebook';
}
