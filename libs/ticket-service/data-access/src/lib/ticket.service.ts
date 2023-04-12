import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateTicketDto,
  EVENT_SERVICE,
  TicketResponse,
  USER_SERVICE,
  UpdateTicketDto
} from '@ticketforge/shared/api-interfaces';
import { GET_USER_CMD } from '@ticketforge/shared/message-broker';
import { TicketEntity } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    private readonly orm: MikroORM,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    @Inject(EVENT_SERVICE) private readonly eventService: ClientProxy,

  ) {}

  private readonly ticketRepository = this.orm.em.getRepository(TicketEntity);

  @UseRequestContext()
  async createTicket(createTicketDto: CreateTicketDto) {
    const ticket = new TicketEntity();
    ticket.name = createTicketDto.name;
    ticket.description = createTicketDto.description;
    ticket.price = createTicketDto.price;
    ticket.event_id = createTicketDto.event_id;
    ticket.user_id = createTicketDto.user_id;

    //check if user exist
    const user = this.userService.send(GET_USER_CMD, ticket.user_id);
    if (!user) throw new RpcException(new NotFoundException(`User  not found`));

    //check if event exist
    const event = this.eventService.send(EVENT_SERVICE, ticket.event_id);
    if (!event) throw new RpcException(new NotFoundException(`Event  not found`));

    return {
      id: ticket.id,
      name: ticket.name,
      description: ticket.description,
      price: ticket.price,
      event_id: ticket.event_id,
      user_id: ticket.user_id,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
    } as TicketResponse;
  }

  @UseRequestContext()
  async getTicket(id: string) {
    const ticket = await this.ticketRepository.findOne(id);
    if (!ticket) {
      throw new RpcException(new NotFoundException(`Ticket  not found`));
    }
    return ticket as TicketResponse;
  }

  @UseRequestContext()
  async deleteTicket(id: string) {
    const ticket = this.ticketRepository.getReference(id);
    if (!ticket) {
      throw new RpcException(new NotFoundException(`Ticket  not found`));
    }
    await this.ticketRepository.remove(ticket).flush();
    return true;
  }

  @UseRequestContext()
  async updateTicket(updateTicketDto: UpdateTicketDto) {
    const ref = this.ticketRepository.getReference(updateTicketDto.id);
    if (!ref) {
      throw new RpcException(new NotFoundException(`Ticket  not found`));
    }
    ref.name = updateTicketDto.name;
    ref.description = updateTicketDto.description;
    ref.price = updateTicketDto.price;
    ref.event_id = updateTicketDto.event_id;
    ref.user_id = updateTicketDto.user_id;
    await this.ticketRepository.flush();
    return true;
  }
}
