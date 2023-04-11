import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { TicketServiceDataAccessModule } from '@ticketforge/ticket-service/data-access';

@Module({
  controllers: [TicketController],
  providers: [],
  exports: [],
  imports: [SharedMessageBrokerModule, TicketServiceDataAccessModule],
})
export class TicketServiceFeatureModule {}
