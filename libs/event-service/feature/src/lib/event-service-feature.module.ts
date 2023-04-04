import { Module } from '@nestjs/common';
import { EventService } from '@ticketforge/event-service/data-access';
import { EventController } from './event.controller';
import { SharedMessageBrokerModule } from '@ticketforge/shared/message-broker';

@Module({
  controllers: [
    EventController
  ],
  providers: [
    EventService
  ],
  exports: [],
  imports: [
    SharedMessageBrokerModule
  ]
  
})
export class EventServiceFeatureModule {}
