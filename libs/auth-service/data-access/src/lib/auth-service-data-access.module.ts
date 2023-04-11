import { Module } from '@nestjs/common';
import { USER_SERVICE } from '@ticketforge/shared/api-interfaces';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { AuthService } from './auth.service';

@Module({
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
  ],
})
export class AuthServiceDataAccessModule {}
