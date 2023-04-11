import { Module } from '@nestjs/common';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { AuthController } from './auth.controller';
import { AuthServiceDataAccessModule } from '@ticketforge/auth-service/data-access';

@Module({
  controllers: [
    AuthController
  ],
  providers: [],
  exports: [],
  imports: [
    AuthServiceDataAccessModule,
    SharedMessageBrokerModule
  ]
})
export class AuthServiceFeatureModule {}
