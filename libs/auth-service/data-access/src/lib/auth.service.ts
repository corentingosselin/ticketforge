import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  LoginUserDto,
  USER_SERVICE,
  UserResponse,
  UserSessionResponse
} from '@ticketforge/shared/api-interfaces';
import { CREATE_USER_CMD } from '@ticketforge/shared/message-broker';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {

constructor(
  @Inject(USER_SERVICE) private readonly userService: ClientProxy
) {

}

  login(loginDto: LoginUserDto) {
    const userSession: UserSessionResponse = {
      user: {
        id: '1',
        lastName: 'test',
        firstName: 'test',
        email: loginDto.email,
        updated_at: new Date(),
        created_at: new Date(),
      },
      tokken: 'token',
    };

    return of(userSession);
  }

  register(registerDto: CreateUserDto) {
    const userResponse : Observable<UserResponse> = this.userService.send(CREATE_USER_CMD, registerDto); 
    return userResponse;
  }
}
