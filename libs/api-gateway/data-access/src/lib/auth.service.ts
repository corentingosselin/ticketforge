import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE, CreateUserDto, LoginUserDto, UserSessionResponse } from '@ticketforge/shared/api-interfaces';
import { LOGIN_CMD, REGISTER_CMD } from '@ticketforge/shared/message-broker';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authentificationService: ClientProxy
  ) {}

  login(loginDto: LoginUserDto) : Observable<UserSessionResponse> {
    return this.authentificationService.send(LOGIN_CMD, loginDto);
  }

  register(registerDto: CreateUserDto) {
    return this.authentificationService.send(REGISTER_CMD, registerDto);
  }

}
