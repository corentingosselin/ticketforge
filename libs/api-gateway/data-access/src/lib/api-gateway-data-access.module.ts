import { Module } from '@nestjs/common';
import { SharedNetworkModule } from '@ticketforge/shared/network';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { TicketService } from './ticket.service';
import { UserService } from './user.service';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import {
  AUTH_SERVICE,
  EVENT_SERVICE,
  TICKET_SERVICE,
  USER_SERVICE,
} from '@ticketforge/shared/api-interfaces';

@Module({
  controllers: [],
  providers: [AuthService, EventService, TicketService, UserService],
  exports: [AuthService, EventService, TicketService, UserService],
  imports: [
    SharedMessageBrokerModule.registerClient({
      name: AUTH_SERVICE,
    }),
    SharedMessageBrokerModule.registerClient({
      name: EVENT_SERVICE,
    }),
    SharedMessageBrokerModule.registerClient({
      name: TICKET_SERVICE,
    }),
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
  ],
})
export class ApiGatewayDataAccessModule {}
