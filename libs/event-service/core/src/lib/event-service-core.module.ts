import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { EventServiceFeatureModule } from '@ticketforge/event-service/feature';
import mikroOrmConfig from '../mikro-orm.config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    EventServiceFeatureModule,
    MikroOrmModule.forRootAsync(
      {
        useFactory: () => ({
          registerRequestContext: false,
          debug: true,
          ...mikroOrmConfig
        }),
        inject: [],

    }),
  ],
})
export class EventServiceCoreModule {}
