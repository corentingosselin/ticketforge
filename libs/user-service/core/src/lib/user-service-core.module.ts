import { Module } from '@nestjs/common';
import { UserServiceFeatureModule } from '@ticketforge/user-service/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    UserServiceFeatureModule
  ]
})
export class UserServiceCoreModule {}
