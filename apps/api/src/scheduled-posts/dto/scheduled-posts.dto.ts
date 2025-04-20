export class CreateScheduledPostDto {
  title: string;
  content: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'draft';
  platform: 'linkedin' | 'twitter' | 'facebook';
}

export class UpdateScheduledPostDto {
  title?: string;
  content?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  status?: 'scheduled' | 'draft' | 'published' | 'failed';
  platform?: 'linkedin' | 'twitter' | 'facebook';
}
