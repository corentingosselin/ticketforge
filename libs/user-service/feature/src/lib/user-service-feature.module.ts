import { Module } from '@nestjs/common';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { UserServiceDataAccessModule } from '@ticketforge/user-service/data-access';
import { UserController } from './user.controller';

@Module({
  controllers: [
    UserController
  ],
  providers: [
  ],
  exports: [],
  imports: [
    UserServiceDataAccessModule,
    SharedMessageBrokerModule,

  ],
})
export class UserServiceFeatureModule {}
