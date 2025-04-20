import { Post } from '../../posts/entities/post.entity';

export class ScrapeProfileDto {
  url: string;
  startDate?: string;
  endDate?: string;
}

export class ScrapedResultDto {
  savedPosts: Post[];
  count: number;
}

export class JobResultsDto {
  requestId: string;
}

export class ScraperJobDto {
  id: string;
  status: string;
  createdAt: string;
  profileUrl: string;
}

export class SavedPostsResultDto {
  savedPosts: any[];
  count: number;
}
