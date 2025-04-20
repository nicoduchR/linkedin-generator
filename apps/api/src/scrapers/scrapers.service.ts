import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { PostsService } from '../posts/posts.service';
import { PostStatus } from '../posts/dto/posts.dto';
import { Post } from '../posts/entities/post.entity';

export interface ScrapedPostData {
  title?: string;
  content: string;
  date?: string;
  likes?: number;
  comments?: number;
}

@Injectable()
export class ScrapersService {
  private readonly logger = new Logger(ScrapersService.name);
  private readonly BRIGHT_DATA_API_KEY =
    '372d96779f770215c78e304930493ab10383c8041a685a7508dcd230e33295fe';
  private readonly BRIGHT_DATA_DATASET_ID = 'gd_lyy3tktm25m4avu764';
  private readonly BRIGHT_DATA_API_URL =
    'https://api.brightdata.com/datasets/v3';

  constructor(private readonly postsService: PostsService) {}

  async scrapeAndSaveProfile(
    profileUrl: string,
    startDate?: string,
    endDate?: string,
  ): Promise<{ savedPosts: Post[]; count: number }> {
    try {
      this.logger.log(`Scraping and saving posts from profile: ${profileUrl}`);

      // 1. Trigger the scraping job
      const requestId = await this.triggerScrapingJob(
        profileUrl,
        startDate,
        endDate,
      );

      // 2. Poll for results until job is completed
      const scrapedData = await this.waitForAndFetchResults(requestId);

      // 3. Process and save results
      return await this.saveScrapedPosts(scrapedData);
    } catch (error) {
      this.logger.error(
        `Error scraping and saving LinkedIn profile: ${error.message || 'Unknown error'}`,
      );
      throw new HttpException(
        `Failed to scrape and save profile: ${error.message || 'Unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async triggerScrapingJob(
    profileUrl: string,
    startDate?: string,
    endDate?: string,
  ): Promise<string> {
    try {
      const data = JSON.stringify([
        {
          url: profileUrl,
          start_date: startDate || undefined,
          end_date: endDate || undefined,
        },
      ]);

      const response = await axios.post(
        `${this.BRIGHT_DATA_API_URL}/trigger?dataset_id=${this.BRIGHT_DATA_DATASET_ID}&include_errors=true&type=discover_new&discover_by=profile_url`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.BRIGHT_DATA_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      this.logger.log(
        `Scrape job initiated with request ID: ${response.data.request_id}`,
      );
      return response.data.request_id;
    } catch (error) {
      this.logger.error(`Error triggering scrape job: ${error.message}`);
      throw new Error(`Failed to trigger scrape job: ${error.message}`);
    }
  }

  private async waitForAndFetchResults(
    requestId: string,
    maxAttempts = 10,
  ): Promise<any> {
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        attempts++;
        this.logger.log(
          `Checking job status, attempt ${attempts}/${maxAttempts}`,
        );

        // Check job status
        const statusResponse = await axios.get(
          `${this.BRIGHT_DATA_API_URL}/datasets/${this.BRIGHT_DATA_DATASET_ID}/requests/${requestId}`,
          {
            headers: {
              Authorization: `Bearer ${this.BRIGHT_DATA_API_KEY}`,
            },
          },
        );

        const status = statusResponse.data.status;
        this.logger.log(`Job status: ${status}`);

        if (status === 'finished' || status === 'completed') {
          // Job is done, fetch results
          const resultsResponse = await axios.get(
            `${this.BRIGHT_DATA_API_URL}/datasets/${this.BRIGHT_DATA_DATASET_ID}/requests/${requestId}/results`,
            {
              headers: {
                Authorization: `Bearer ${this.BRIGHT_DATA_API_KEY}`,
              },
            },
          );

          return resultsResponse.data;
        } else if (status === 'failed' || status === 'error') {
          throw new Error(`Scraping job failed with status: ${status}`);
        }

        // Wait before checking again
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (error) {
        this.logger.error(`Error checking job status: ${error.message}`);
        throw error;
      }
    }

    throw new Error(
      'Maximum number of attempts reached waiting for scraping results',
    );
  }

  private async saveScrapedPosts(
    data: any,
  ): Promise<{ savedPosts: Post[]; count: number }> {
    try {
      // Process the scraped data to extract posts
      const posts = this.processScrapedData(data);

      // Save each post
      const savedPosts: Post[] = [];
      for (const post of posts) {
        const savedPost = await this.postsService.create({
          title: post.title || 'LinkedIn Post',
          content: post.content,
          status: PostStatus.PUBLISHED,
          platform: 'linkedin',
        });
        savedPosts.push(savedPost);
      }

      return {
        savedPosts,
        count: savedPosts.length,
      };
    } catch (error) {
      this.logger.error(`Error saving posts: ${error.message}`);
      throw new Error(`Failed to save posts: ${error.message}`);
    }
  }

  private processScrapedData(data: any): ScrapedPostData[] {
    // Extract posts from the scraped data
    if (!data || !data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((result: any) => {
      return {
        title: result.title || '',
        content: result.content || result.text || '',
        date: result.date || new Date().toISOString(),
        likes: result.likes || 0,
        comments: result.comments || 0,
      };
    });
  }
}
