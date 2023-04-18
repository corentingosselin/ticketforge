import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateTicketDto,
  PurchaseTicketDto,
  TICKET_SERVICE,
  TicketResponse,
  UpdateTicketDto
} from '@ticketforge/shared/api-interfaces';
import {
  BUY_TICKET_CMD,
  CREATE_TICKET_CMD,
  DELETE_TICKET_CMD,
  FIND_ALL_TICKET_CMD,
  GET_TICKET_CMD,
  UPDATE_TICKET_CMD,
} from '@ticketforge/shared/message-broker';
import { RpcService } from '@ticketforge/shared/network';
import { IService } from '../service.interface';

@Injectable()
export class TicketService implements IService<TicketResponse> {
  private readonly rpcService: RpcService;
  constructor(
    @Inject(TICKET_SERVICE) private readonly ticketService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.ticketService);
  }

  create(createTicketDto: CreateTicketDto) {
    return this.rpcService.sendWithRpcExceptionHandler<TicketResponse>(
      CREATE_TICKET_CMD,
      createTicketDto
    );
  }

  update(updateTicketDto: UpdateTicketDto) {
    return this.rpcService.sendWithRpcExceptionHandler<TicketResponse>(
      UPDATE_TICKET_CMD,
      updateTicketDto
    );
  }

  findOne(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<TicketResponse>(
      GET_TICKET_CMD,
      id
    );
  }

  delete(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<boolean>(
      DELETE_TICKET_CMD,
      id
    );
  }

  findAll(userId: string) {
    return this.rpcService.sendWithRpcExceptionHandler<TicketResponse[]>(
      FIND_ALL_TICKET_CMD,
      userId
    );
  }

  async hasOwnership(id: string | number, ownerId: string | number): Promise<boolean> {
      const ticket = await this.findOne(id.toString());
      return ticket.user_id === ownerId;
  }

  purchase(purchaseDto: PurchaseTicketDto) {
    return this.rpcService.sendWithRpcExceptionHandler<TicketResponse>(
      BUY_TICKET_CMD,
      purchaseDto
    );
  }
}
