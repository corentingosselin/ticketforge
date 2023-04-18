import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  USER_SERVICE,
  UpdateUserDto,
  User,
  UserAccountResponse,
  UserResponse,
} from '@ticketforge/shared/api-interfaces';
import {
  CREATE_USER_CMD,
  DELETE_USER_CMD,
  GET_USER_CMD,
  UPDATE_USER_CMD,
} from '@ticketforge/shared/message-broker';
import { RpcService } from '@ticketforge/shared/network';
import { IService } from '../service.interface';

@Injectable()
export class UserService implements IService<UserAccountResponse, CreateUserDto> {
  private readonly rpcService: RpcService;
  constructor(@Inject(USER_SERVICE) private readonly userService: ClientProxy) {
    this.rpcService = new RpcService(this.userService);
  }

  create(createUserDto: CreateUserDto) {
    return this.rpcService.sendWithRpcExceptionHandler<UserAccountResponse>(
      CREATE_USER_CMD,
      createUserDto
    );
  }

  async findOne(id: string) {
    const userReponse = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
      GET_USER_CMD,
      id
    );
    delete userReponse.password;
    return userReponse as UserAccountResponse;
  }

  delete(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<boolean>(
      DELETE_USER_CMD,
      id
    );
  }

  update(updateUserDto: UpdateUserDto) {
    return this.rpcService.sendWithRpcExceptionHandler<UserAccountResponse>(
      UPDATE_USER_CMD,
      updateUserDto
    );
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async hasOwnership(id: string | number, ownerId: string | number): Promise<boolean> {
    const user = await this.findOne(id as string);
    return user.id === ownerId;
  }
}
