import { Module } from '@nestjs/common';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { UserController } from './user.controller';
import { UserService } from '@ticketforge/user-service/data-access';

@Module({
  controllers: [
    UserController
  ],
  providers: [
    UserService
  ],
  exports: [],
  imports: [
    SharedMessageBrokerModule
  ],
})
export class UserServiceFeatureModule {}
