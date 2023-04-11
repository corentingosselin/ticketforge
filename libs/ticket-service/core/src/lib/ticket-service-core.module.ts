import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TicketServiceFeatureModule } from '@ticketforge/ticket-service/feature';
import { mikroOrmConfig } from '../mikro-orm.config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    TicketServiceFeatureModule,
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
export class TicketServiceCoreModule {


}
