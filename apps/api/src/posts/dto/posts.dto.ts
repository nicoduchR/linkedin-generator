import { PartialType } from '@nestjs/mapped-types';

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SCHEDULED = 'scheduled',
}

export enum EngagementLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class CreatePostDto {
  title: string;
  content: string;
  platform: string;
  imageUrl?: string;
  status?: PostStatus = PostStatus.DRAFT;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {
  likes?: number;
  comments?: number;
  engagement?: EngagementLevel;
}
