import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TicketServiceCoreModule } from '@ticketforge/ticket-service/core';

@Module({
  imports: [
    TicketServiceCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
