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
import { ApiBearerAuth } from '@nestjs/swagger';
import { TicketService } from '@ticketforge/api-gateway/data-access';
import {
  OwnedType,
  OwnedTypeGuard,
  OwnerShipGuard,
  Roles,
  RolesGuard,
  ServiceClass
} from '@ticketforge/api-gateway/utils';
import {
  CreateTicketDto,
  PurchaseTicketDto,
  UpdateTicketDto,
  UserRole
} from '@ticketforge/shared/api-interfaces';

@Controller('ticket')
export class TicketController {


  constructor(
    private readonly ticketService: TicketService,
  ) {}

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @ApiBearerAuth()
  @ServiceClass(TicketService)
  @UseGuards(OwnerShipGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto
  ) {
    updateTicketDto.id = id;
    return this.ticketService.update(updateTicketDto);
  }

  @ApiBearerAuth()
  @ServiceClass(TicketService)
  @UseGuards(OwnerShipGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ticketService.delete(id);
  }

  @ApiBearerAuth()
  @OwnedTypeGuard(OwnedType.USER)
  @ServiceClass(TicketService)
  @UseGuards(OwnerShipGuard)
  @Get('user/:id')
  findAll(@Param('id') id: string) {
    return this.ticketService.findAll(id);
  }

  // TODO: vulnerability, anyone can buy a ticket with any user id
  // we need a better guard with custom decorator that provide the field of the dto to verify
  @ApiBearerAuth()
  @Roles(UserRole.USER)
  @UseGuards(RolesGuard)
  @Post('buy')
  async buy(@Body() purchaseDto: PurchaseTicketDto) {
    return this.ticketService.purchase(purchaseDto);
  }

}
