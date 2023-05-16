import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '@ticketforge/api-gateway/data-access';
import {
  OwnerShipGuard,
  Roles,
  RolesGuard,
  ServiceClass,
} from '@ticketforge/api-gateway/utils';
import {
  CreateUserDto,
  UpdateUserDto,
  UserAccountResponse,
  UserRole,
} from '@ticketforge/shared/api-interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ServiceClass(UserService)
  @UseGuards(OwnerShipGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    return this.userService.update(updateUserDto);
  }

  @ApiBearerAuth()
  @ServiceClass(UserService)
  @UseGuards(OwnerShipGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return user as UserAccountResponse;
  }

  @ApiBearerAuth()
  @ServiceClass(UserService)
  @UseGuards(OwnerShipGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
