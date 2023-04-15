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
import { UserService } from '@ticketforge/api-gateway/data-access';
import { Roles, RolesGuard } from '@ticketforge/api-gateway/utils';
import { CreateUserDto, UpdateUserDto, UserAccountResponse, UserRole } from '@ticketforge/shared/api-interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    return this.userService.updateUser(updateUserDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  async get(@Param('id') id: string) {
    const user = await this.userService.getUser(id);
    delete user.password;
    return user as UserAccountResponse;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
