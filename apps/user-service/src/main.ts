/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { MessageBrokerService } from '@ticketforge/shared/message-broker';
import { USER_SERVICE } from '@ticketforge/shared/api-interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const msgBrokerService = app.get(MessageBrokerService);
  const clientOtions = msgBrokerService.getOptions(USER_SERVICE);
  app.connectMicroservice(clientOtions);
  await app.startAllMicroservices();

  const config = app.get(ConfigService);
  const port = config.get('USER_SERVICE_PORT') || 3200;
  await app.listen(port);
  Logger.log(
    `🚀 User service is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
