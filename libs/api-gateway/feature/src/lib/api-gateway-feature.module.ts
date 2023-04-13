import { Module } from '@nestjs/common';
import {
  ApiGatewayDataAccessModule
} from '@ticketforge/api-gateway/data-access';
import { AuthController } from './auth.controller';
import { EventController } from './event.controller';
import { TicketController } from './ticket.controller';
import { UserController } from './user.controller';
import { JwtAuthGuard } from '@ticketforge/api-gateway/utils';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [
    AuthController,
    EventController,
    TicketController,
    UserController,
  ],
  providers: [
    JwtAuthGuard,
  ],
  exports: [],
  imports: [
    ApiGatewayDataAccessModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
})
export class ApiGatewayFeatureModule {}
