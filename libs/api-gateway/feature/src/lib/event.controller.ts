import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventService } from '@ticketforge/api-gateway/data-access';
import { Roles, RolesGuard } from '@ticketforge/api-gateway/utils';
import {
  CreateEventDto,
  UpdateEventDto,
  UserRole,
} from '@ticketforge/shared/api-interfaces';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto
  ) {
    updateEventDto.id = id;
    return this.eventService.update(updateEventDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eventService.delete(id);
  }

  @Get()
  getAll() {
    return this.eventService.findAll();
  }
}
