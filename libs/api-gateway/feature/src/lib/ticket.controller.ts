import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
import { TicketService } from '@ticketforge/api-gateway/data-access';
import { CreateTicketDto, UpdateTicketDto } from '@ticketforge/shared/api-interfaces';
  
  @Controller('ticket')
  export class TicketController {
    constructor(private readonly ticketService: TicketService) {}
  
    @Post()
    async create(@Body() createTicketDto: CreateTicketDto) {
      return this.ticketService.createTicket(createTicketDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
      return this.ticketService.updateTicket(updateTicketDto);
    }
  
    @Get(':id')
    async get(@Param('id') id: string) {
      return this.ticketService.getTicket(id);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.ticketService.deleteTicket(id);
    }
  }
  