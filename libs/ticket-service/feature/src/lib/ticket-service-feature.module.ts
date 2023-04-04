import { Module } from '@nestjs/common';
import { TicketService } from '@ticketforge/ticket-service/data-access';
import { TicketController } from './ticket.controller';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';

@Module({
  controllers: [
    TicketController
  ],
  providers: [
    TicketService
  ],
  exports: [],
  imports: [
    SharedMessageBrokerModule
  ]
})
export class TicketServiceFeatureModule {}
