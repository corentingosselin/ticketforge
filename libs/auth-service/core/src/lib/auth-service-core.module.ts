import { Module } from '@nestjs/common';
import { AuthServiceFeatureModule } from '@ticketforge/auth-service/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    AuthServiceFeatureModule
  ],
})
export class AuthServiceCoreModule {}
