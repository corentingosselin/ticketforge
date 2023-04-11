/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { MessageBrokerService } from '@ticketforge/shared/message-broker';
import { TICKET_SERVICE } from '@ticketforge/shared/api-interfaces';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const msgBrokerService = app.get(MessageBrokerService);
  const clientOtions = msgBrokerService.getOptions(TICKET_SERVICE);
  app.connectMicroservice(clientOtions);
  await app.startAllMicroservices();

  const config = app.get(ConfigService);
  const port = config.get('TICKET_SERVICE_PORT') || 3400;
  await app.listen(port);
  Logger.log(
    `🚀 Ticket Service is running on: http://localhost:${port}`
  );
}

bootstrap();
