import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from '@ticketforge/api-gateway/data-access';
import {
  OwnerShipGuard,
  RolesGuard,
  ServiceClass
} from '@ticketforge/api-gateway/utils';
import {
  CreateTicketDto,
  UpdateTicketDto
} from '@ticketforge/shared/api-interfaces';

@Controller('ticket')
export class TicketController {


  constructor(
    private readonly ticketService: TicketService,
  ) {}


  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto
  ) {
    updateTicketDto.id = id;
    return this.ticketService.update(updateTicketDto);
  }

  @ServiceClass(TicketService)
  @UseGuards(OwnerShipGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ticketService.delete(id);
  }
}
