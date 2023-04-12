import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
      CreateUserDto,
  USER_SERVICE,
  UpdateUserDto,
  User,
  UserResponse,
} from '@ticketforge/shared/api-interfaces';
import { CREATE_USER_CMD, DELETE_USER_CMD, GET_USER_CMD, UPDATE_USER_CMD } from '@ticketforge/shared/message-broker';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy
  ) {}

  createUser(createUserDto: CreateUserDto) : Observable<UserResponse> {
    return this.userService.send(CREATE_USER_CMD, createUserDto);
  }

  getUser(id: string) : Promise<UserResponse> {
    return lastValueFrom(this.userService.send(GET_USER_CMD, id));
  }

  deleteUser(id: string) : Observable<boolean> {
    return this.userService.send(DELETE_USER_CMD, id);
  }

  updateUser(updateUserDto: UpdateUserDto) : Observable<UserResponse> {
    return this.userService.send(UPDATE_USER_CMD, updateUserDto);
  }
}
