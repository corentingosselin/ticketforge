import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { EventController } from './event.controller';
import { TicketController } from './ticket.controller';
import { UserController } from './user.controller';
import {
  AuthService,
  EventService,
  TicketService,
  UserService,
} from '@ticketforge/api-gateway/data-access';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import {
  AUTH_SERVICE,
  EVENT_SERVICE,
  TICKET_SERVICE,
  USER_SERVICE,
} from '@ticketforge/shared/api-interfaces';

@Module({
  controllers: [
    AuthController,
    EventController,
    TicketController,
    UserController,
  ],
  providers: [AuthService, EventService, TicketService, UserService],
  exports: [],
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
export class ApiGatewayFeatureModule {}
