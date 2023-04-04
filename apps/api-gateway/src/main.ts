/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = app.get(ConfigService);
  const port = config.get('API_GATEWAY_PORT') || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 API Gateway is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
