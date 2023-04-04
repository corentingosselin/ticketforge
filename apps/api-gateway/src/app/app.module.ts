import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayCoreModule } from '@ticketforge/api-gateway/core';

@Module({
  imports: [
    ApiGatewayCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
