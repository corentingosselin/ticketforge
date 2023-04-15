import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateEventDto,
  EventResponse,
  UpdateEventDto,
} from '@ticketforge/shared/api-interfaces';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(private readonly orm: MikroORM) {}

  private readonly eventRepository = this.orm.em.getRepository(EventEntity);

  @UseRequestContext()
  async createEvent(createEventDto: CreateEventDto) {
    const event = new EventEntity();
    Object.assign(event, createEventDto);
    await this.eventRepository.persist(event).flush();
    return event as EventResponse;
  }

  @UseRequestContext()
  async getEvent(id: string) {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new RpcException(new NotFoundException(`Event  not found`));
    }
    return event as EventResponse;
  }

  async deleteEvent(id: string) {
    const event = this.eventRepository.getReference(id);
    if (!event) {
      throw new RpcException(new NotFoundException(`Event  not found`));
    }
    await this.eventRepository.remove(event).flush();
    return true;
  }

  @UseRequestContext()
  async updateEvent(updateEventDto: UpdateEventDto) {
    const ref = this.eventRepository.getReference(updateEventDto.id);
    if (!ref) {
      throw new RpcException(new NotFoundException(`Event  not found`));
    }
    Object.assign(ref, updateEventDto);
    await this.eventRepository.flush();
    return ref;
  }
}
