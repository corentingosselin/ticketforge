import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  AUTH_SERVICE,
  CreateUserDto,
  LoginUserDto,
  UserSessionResponse,
} from '@ticketforge/shared/api-interfaces';
import { LOGIN_CMD, REGISTER_CMD } from '@ticketforge/shared/message-broker';
import { RpcService } from '@ticketforge/shared/network';

@Injectable()
export class AuthService {
  private readonly rpcService: RpcService;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authentificationService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.authentificationService);
  }

  login(loginDto: LoginUserDto) {
    return this.rpcService.sendWithRpcExceptionHandler<UserSessionResponse>(
      LOGIN_CMD,
      loginDto
    );
  }

  async register(registerDto: CreateUserDto) {
    const result =
       await this.rpcService.sendWithRpcExceptionHandler<UserSessionResponse>(
        REGISTER_CMD,
        registerDto
      );
    return result;
  }
}
