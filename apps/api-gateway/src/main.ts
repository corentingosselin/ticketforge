/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { RpcToHttpExceptionFilter } from '@ticketforge/shared/network';
import '@mikro-orm/core';
import '@mikro-orm/nestjs';
import '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const fastifyOptions: ConstructorParameters<typeof FastifyAdapter>[0] = {
    logger: true,
  };
  const fastifyAdapter = new FastifyAdapter(fastifyOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = app.get(ConfigService);

  app.useGlobalFilters(new RpcToHttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      disableErrorMessages: config.get('NODE_ENV') === 'production',
      stopAtFirstError: true,
      forbidUnknownValues: true,
      skipMissingProperties: false, // if value is missing, the validator does not check
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  setupOpenApi(app);
  const port = config.get('API_GATEWAY_PORT') || 3000;
  await app.listen(port, '0.0.0.0');
  //await app.listen(port);
  Logger.log(
    `🚀 API Gateway is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

function setupOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openApi', app, document, { useGlobalPrefix: true });
}
