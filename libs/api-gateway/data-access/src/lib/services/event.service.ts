import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateEventDto,
  EVENT_SERVICE,
  EventResponse,
  UpdateEventDto
} from '@ticketforge/shared/api-interfaces';
import {
  CREATE_EVENT_CMD,
  DELETE_EVENT_CMD,
  GET_EVENT_CMD,
  UPDATE_EVENT_CMD,
} from '@ticketforge/shared/message-broker';
import { RpcService } from '@ticketforge/shared/network';
import { IService } from '../service.interface';

@Injectable()
export class EventService implements IService<EventResponse> {
  private readonly rpcService: RpcService;
  constructor(
    @Inject(EVENT_SERVICE) private readonly eventService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.eventService);
  }

  create(createEventDto: CreateEventDto) {
    return this.rpcService.sendWithRpcExceptionHandler<EventResponse>(
      CREATE_EVENT_CMD,
      createEventDto
    );
  }

  update(updateEventDto: UpdateEventDto) {
    return this.rpcService.sendWithRpcExceptionHandler<EventResponse>(
      UPDATE_EVENT_CMD,
      updateEventDto
    );
  }

  findOne(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<EventResponse>(
      GET_EVENT_CMD,
      id
    );
  }

  delete(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<boolean>(
      DELETE_EVENT_CMD,
      id
    );
  }

  findAll(): Promise<EventResponse[]> {
    throw new Error('Method not implemented.');
  }

}
