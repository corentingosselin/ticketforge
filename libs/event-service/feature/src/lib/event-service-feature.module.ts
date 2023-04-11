import { Module } from '@nestjs/common';
import { EventServiceDataAccessModule } from '@ticketforge/event-service/data-access';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';
import { EventController } from './event.controller';

@Module({
  controllers: [
    EventController
  ],
  providers: [],
  exports: [],
  imports: [
    SharedMessageBrokerModule,
    EventServiceDataAccessModule
  ]
  
})
export class EventServiceFeatureModule {}
