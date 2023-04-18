import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateTicketDto,
  EVENT_SERVICE,
  EventResponse,
  PurchaseTicketDto,
  TicketResponse,
  USER_SERVICE,
  UpdateTicketDto,
  UserResponse,
} from '@ticketforge/shared/api-interfaces';
import {
  GET_EVENT_CMD,
  GET_USER_CMD,
  UPDATE_EVENT_CMD,
} from '@ticketforge/shared/message-broker';
import { TicketEntity } from './entities/ticket.entity';
import { delay, lastValueFrom, of } from 'rxjs';
import { RpcService } from '@ticketforge/shared/network';
import { MailService } from './mail-service';

@Injectable()
export class TicketService {
  private readonly rpcEventService: RpcService;
  private readonly rpcUserService: RpcService;

  constructor(
    private readonly orm: MikroORM,
    private readonly mailService: MailService,
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    @Inject(EVENT_SERVICE) private readonly eventService: ClientProxy
  ) {
    this.rpcEventService = new RpcService(this.eventService);
    this.rpcUserService = new RpcService(this.userService);
  }

  private readonly ticketRepository = this.orm.em.getRepository(TicketEntity);

  @UseRequestContext()
  async createTicket(createTicketDto: CreateTicketDto) {
    //check if user exist
    const user = this.userService.send(GET_USER_CMD, createTicketDto.user_id);
    if (!user) throw new RpcException(new NotFoundException(`User not found`));

    //check if event exist
    await this.rpcEventService.sendWithRpcExceptionHandler<EventResponse>(
      GET_EVENT_CMD,
      createTicketDto.event_id
    );

    const ticket = new TicketEntity();
    Object.assign(ticket, createTicketDto);
    await this.ticketRepository.persist(ticket).flush();

    return ticket as TicketResponse;
  }

  @UseRequestContext()
  async getTicket(id: string) {
    const ticket = await this.ticketRepository.findOne(id);
    if (!ticket) {
      throw new RpcException(new NotFoundException(`Ticket not found`));
    }
    return ticket as TicketResponse;
  }

  @UseRequestContext()
  async deleteTicket(id: string) {
    const ticket = this.ticketRepository.getReference(id);
    if (!ticket) {
      throw new RpcException(new NotFoundException(`Ticket not found`));
    }
    await this.ticketRepository.remove(ticket).flush();

    const updateEvenDto = {
      id: ticket.event_id,
      ticketsSold: ticket.quantity,
    };
    //update ticket quantity
    await this.rpcEventService.sendWithRpcExceptionHandler<EventResponse>(
      UPDATE_EVENT_CMD,
      updateEvenDto
    );

    return true;
  }

  @UseRequestContext()
  async updateTicket(updateTicketDto: UpdateTicketDto) {
    const ref = this.ticketRepository.getReference(updateTicketDto.id);
    if (!ref) {
      throw new RpcException(new NotFoundException(`Ticket not found`));
    }
    ref.purchasedUnitPrice = updateTicketDto.purchasedUnitPrice;
    ref.event_id = updateTicketDto.event_id;
    ref.user_id = updateTicketDto.user_id;
    await this.ticketRepository.flush();
    return true;
  }

  @UseRequestContext()
  findAll(userId: string) {
    return this.ticketRepository.find({ user_id: userId });
  }

  @UseRequestContext()
  async purchase(purchaseDto: PurchaseTicketDto) {
    //check if event exist
    const event =
      await this.rpcEventService.sendWithRpcExceptionHandler<EventResponse>(
        GET_EVENT_CMD,
        purchaseDto.ticket.event_id
      );

    if (
      event &&
      event.ticketsSold + purchaseDto.ticket.quantity > event.maximumTickets
    ) {
      throw new RpcException(
        new NotFoundException(`There are not enough tickets available`)
      );
    }

    //fake payment process with observable delayed
    const isPurchased = await lastValueFrom(of(true).pipe(delay(4000)));
    if (!isPurchased) {
      throw new RpcException(new NotFoundException(`Payment failed`));
    }

    const updateEvenDto = {
      id: purchaseDto.ticket.event_id,
      ticketsSold: event.ticketsSold + purchaseDto.ticket.quantity,
    };
    //update ticket quantity
    await this.rpcEventService.sendWithRpcExceptionHandler<EventResponse>(
      UPDATE_EVENT_CMD,
      updateEvenDto
    );

    const user =
      await this.rpcUserService.sendWithRpcExceptionHandler<UserResponse>(
        GET_USER_CMD,
        purchaseDto.ticket.user_id
      );

    const ticket = await this.createTicket(purchaseDto.ticket);
    this.mailService.sendEmail(user.email, event, ticket);

    return ticket;
  }
}
