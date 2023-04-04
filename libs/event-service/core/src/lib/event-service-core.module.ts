import { Module } from '@nestjs/common';
import { EventServiceFeatureModule } from '@ticketforge/event-service/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    EventServiceFeatureModule
  ],
})
export class EventServiceCoreModule {}
