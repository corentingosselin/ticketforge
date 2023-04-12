import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateEventDto,
  EVENT_SERVICE,
  EventResponse,
  UpdateEventDto,
} from '@ticketforge/shared/api-interfaces';
import {
  CREATE_EVENT_CMD,
  DELETE_EVENT_CMD,
  GET_EVENT_CMD,
  UPDATE_EVENT_CMD,
} from '@ticketforge/shared/message-broker';
import { RpcService } from '@ticketforge/shared/network';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {

  private readonly rpcService: RpcService;
  constructor(
    @Inject(EVENT_SERVICE) private readonly eventService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.eventService);
  }

  createEvent(createEventDto: CreateEventDto){
    return this.rpcService.sendWithRpcExceptionHandler<EventResponse>(CREATE_EVENT_CMD, createEventDto);
  }

  updateEvent(updateEventDto: UpdateEventDto): Observable<Event> {
    return this.eventService.send(UPDATE_EVENT_CMD, updateEventDto);
  }

  getEvent(id: string): Observable<Event> {
    return this.eventService.send(GET_EVENT_CMD, id);
  }

  deleteEvent(id: string): Observable<boolean> {
    return this.eventService.send(DELETE_EVENT_CMD, id);
  }
}
