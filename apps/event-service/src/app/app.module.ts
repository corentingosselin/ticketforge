import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventServiceCoreModule } from '@ticketforge/event-service/core';

@Module({
  imports: [
    EventServiceCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
