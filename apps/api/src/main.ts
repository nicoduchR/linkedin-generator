import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

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

  // Get port from environment variable or use default
  const port = process.env.PORT || 3001;

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api`);
  logger.log(
    `Swagger documentation available at: http://localhost:${port}/api/docs`,
  );
}
bootstrap();
