export class CreateAnecdoteDto {
  title: string;
  content: string;
  category: string;
  tags: string[];
  favorite?: boolean;
}

export class UpdateAnecdoteDto {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  favorite?: boolean;
}
