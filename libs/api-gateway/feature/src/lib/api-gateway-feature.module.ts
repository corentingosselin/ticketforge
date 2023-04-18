import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  ApiGatewayDataAccessModule
} from '@ticketforge/api-gateway/data-access';
import { JwtAuthService, ServiceFactory } from '@ticketforge/api-gateway/utils';
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
  providers: [
    JwtAuthService,
    ServiceFactory
  ],
  exports: [],
  imports: [
    ApiGatewayDataAccessModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    })
  ],
})
export class ApiGatewayFeatureModule {}
