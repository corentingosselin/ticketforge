import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventService } from '@ticketforge/event-service/data-access';
import { CreateEventDto, UpdateEventDto } from '@ticketforge/shared/api-interfaces';
import {
    CREATE_EVENT_CMD,
    DELETE_TICKET_CMD,
    GET_EVENT_CMD,
    UPDATE_EVENT_CMD
} from '@ticketforge/shared/message-broker';

@Controller()
export class EventController {
  constructor(
    private readonly eventService: EventService
  ) {}

  @MessagePattern(CREATE_EVENT_CMD)
  async createEvent(@Payload() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @MessagePattern(UPDATE_EVENT_CMD)
  async updateEvent(@Payload() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(updateEventDto);
  }

  @MessagePattern(GET_EVENT_CMD)
  async getEvent(@Payload() id: string) {
    return this.eventService.getEvent(id);
  }

  @MessagePattern(DELETE_TICKET_CMD)
  async deleteEvent(@Payload() id: string) {
    return this.eventService.deleteEvent(id);
  }
}
