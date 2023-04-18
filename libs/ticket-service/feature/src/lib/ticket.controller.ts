import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateTicketDto,
  PurchaseTicketDto,
  UpdateTicketDto,
} from '@ticketforge/shared/api-interfaces';
import {
  BUY_TICKET_CMD,
  CREATE_TICKET_CMD,
  DELETE_TICKET_CMD,
  FIND_ALL_TICKET_CMD,
  GET_TICKET_CMD,
  UPDATE_TICKET_CMD,
} from '@ticketforge/shared/message-broker';
import { TicketService } from '@ticketforge/ticket-service/data-access';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @MessagePattern(CREATE_TICKET_CMD)
  async createTicket(@Payload() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  @MessagePattern(UPDATE_TICKET_CMD)
  async updateTicket(@Payload() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.updateTicket(updateTicketDto);
  }

  @MessagePattern(GET_TICKET_CMD)
  async getTicket(@Payload() id: string) {
    return this.ticketService.getTicket(id);
  }

  @MessagePattern(DELETE_TICKET_CMD)
  async deleteTicket(@Payload() id: string) {
    return this.ticketService.deleteTicket(id);
  }

  @MessagePattern(FIND_ALL_TICKET_CMD)
  findAllTicket(@Payload() userId: string) {
    return this.ticketService.findAll(userId);
  }

  @MessagePattern(BUY_TICKET_CMD)
  purchaseTicket(@Payload() purchaseTicketDto: PurchaseTicketDto) {
    return this.ticketService.purchase(purchaseTicketDto);
  }
}
