import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('LinkedIn Generator API')
    .setDescription('API for the LinkedIn Generator application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Get configuration
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api`);
  logger.log(
    `Swagger documentation available at: http://localhost:${port}/api/docs`,
  );
}
// Add void to explicitly mark this promise as ignored
void bootstrap();
