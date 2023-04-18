import { Module } from '@nestjs/common';
import {
  AUTH_SERVICE,
  EVENT_SERVICE,
  TICKET_SERVICE,
  USER_SERVICE,
} from '@ticketforge/shared/api-interfaces';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { AuthService } from './services/auth.service';
import { TicketService } from './services/ticket.service';
import { EventService } from './services/event.service';
import { UserService } from './services/user.service';

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
