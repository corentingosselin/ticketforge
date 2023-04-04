import { Module } from '@nestjs/common';
import { AuthService } from '@ticketforge/auth-service/data-access';
import { AuthController } from './auth.controller';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ],
  exports: [],
  imports: [
    SharedMessageBrokerModule
  ]
})
export class AuthServiceFeatureModule {}
