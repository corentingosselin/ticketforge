import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from '@ticketforge/shared/api-interfaces';
import {
  CREATE_USER_CMD, DELETE_USER_CMD, GET_USER_CMD, UPDATE_USER_CMD
} from '@ticketforge/shared/message-broker';
import { UserService } from '@ticketforge/user-service/data-access';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @MessagePattern(CREATE_USER_CMD)
  createUser(@Payload() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern(UPDATE_USER_CMD)
  updateUser(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @MessagePattern(GET_USER_CMD)
  getUser(@Payload() id: string) {
    return this.userService.getUser(id);
  }

  @MessagePattern(DELETE_USER_CMD)
  deleteUser(@Payload() id: string) {
    return this.userService.deleteUser(id);
  }
}
