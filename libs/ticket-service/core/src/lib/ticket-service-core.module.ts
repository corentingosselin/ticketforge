import { Module } from '@nestjs/common';
import { TicketServiceFeatureModule } from '@ticketforge/ticket-service/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    TicketServiceFeatureModule
  ],
})
export class TicketServiceCoreModule {}
