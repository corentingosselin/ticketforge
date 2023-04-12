import { Module } from '@nestjs/common';
import {
  ApiGatewayDataAccessModule
} from '@ticketforge/api-gateway/data-access';
import { AuthController } from './auth.controller';
import { EventController } from './event.controller';
import { TicketController } from './ticket.controller';
import { UserController } from './user.controller';

@Module({
  controllers: [
    AuthController,
    EventController,
    TicketController,
    UserController,
  ],
  providers: [],
  exports: [],
  imports: [
    ApiGatewayDataAccessModule,
  ],
})
export class ApiGatewayFeatureModule {}
