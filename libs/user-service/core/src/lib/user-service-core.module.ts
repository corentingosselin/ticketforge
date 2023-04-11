import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserServiceFeatureModule } from '@ticketforge/user-service/feature';
import mikroOrmConfig from '../mikro-orm.config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    MikroOrmModule.forRootAsync(
      {
        useFactory: () => ({
          registerRequestContext: false,
          debug: true,
          ...mikroOrmConfig
        }),
        inject: [],

    }),
    UserServiceFeatureModule
  ]
})
export class UserServiceCoreModule {}
