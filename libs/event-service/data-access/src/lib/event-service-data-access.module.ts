import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';

@Module({
  controllers: [],
  providers: [EventService],
  exports: [EventService],
  imports: [MikroOrmModule.forFeature([EventEntity])],
})
export class EventServiceDataAccessModule {}
