import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTicketDto, TICKET_SERVICE, Ticket, UpdateTicketDto } from '@ticketforge/shared/api-interfaces';
import {
  CREATE_TICKET_CMD,
  DELETE_TICKET_CMD,
  GET_TICKET_CMD,
  UPDATE_TICKET_CMD,
} from '@ticketforge/shared/message-broker';
import { Observable } from 'rxjs';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TICKET_SERVICE) private readonly ticketService: ClientProxy
  ) {}

  createTicket(createTicketDto: CreateTicketDto) : Observable<Ticket> {
    return this.ticketService.send(CREATE_TICKET_CMD, createTicketDto);
  }

  updateTicket(updateTicketDto: UpdateTicketDto) : Observable<Ticket> {
    return this.ticketService.send(UPDATE_TICKET_CMD, updateTicketDto);
  }

  getTicket(id: string) : Observable<Ticket> {
    return this.ticketService.send(GET_TICKET_CMD, id);
  }

  deleteTicket(id: string) : Observable<boolean> {
    return this.ticketService.send(DELETE_TICKET_CMD, id);
  }
}
