import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { EVENT_SERVICE, USER_SERVICE } from '@ticketforge/shared/api-interfaces';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { TicketEntity } from './entities/ticket.entity';
import { TicketService } from './ticket.service';

@Module({
  controllers: [],
  providers: [TicketService],
  exports: [TicketService],
  imports: [
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
    SharedMessageBrokerModule.registerClient({
      name: EVENT_SERVICE,
    }),
    MikroOrmModule.forFeature([TicketEntity])

  ],
})
export class TicketServiceDataAccessModule {}
