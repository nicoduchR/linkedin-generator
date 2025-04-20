import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ScrapersService } from './scrapers.service';
import { ScrapeProfileDto } from './dto/scrapers.dto';

@Controller('scrapers')
export class ScrapersController {
  private readonly logger = new Logger(ScrapersController.name);

  constructor(private readonly scrapersService: ScrapersService) {}

  @Post('linkedin/profile')
  async scrapeAndSaveProfile(@Body() scrapeProfileDto: ScrapeProfileDto) {
    this.logger.log(
      `Received request to scrape and save profile: ${scrapeProfileDto.url}`,
    );

    return this.scrapersService.scrapeAndSaveProfile(
      scrapeProfileDto.url,
      scrapeProfileDto.startDate,
      scrapeProfileDto.endDate,
    );
  }
}
