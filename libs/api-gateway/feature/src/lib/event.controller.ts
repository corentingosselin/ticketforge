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
import { EventService } from '@ticketforge/api-gateway/data-access';
import { JwtAuthGuard } from '@ticketforge/api-gateway/utils';
import { CreateEventDto, UpdateEventDto } from '@ticketforge/shared/api-interfaces';
  
  @Controller('event')
  export class EventController {
    constructor(private readonly eventService: EventService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createEventDto: CreateEventDto) {
     return this.eventService.createEvent(createEventDto);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
      updateEventDto.id = id;
      return this.eventService.updateEvent(updateEventDto);
    }
  
    @Get(':id')
    async get(@Param('id') id: string) {
      return this.eventService.getEvent(id);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.eventService.deleteEvent(id);
    }
  }
  