import { Injectable } from '@nestjs/common';
import {
    CreateUserDto,
  LoginUserDto,
  UserSessionResponse,
} from '@ticketforge/shared/api-interfaces';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
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
        const userSession: UserSessionResponse = {
            user: {
                id: '1',
                lastName: registerDto.lastName,
                firstName: registerDto.firstName,
                email: registerDto.email,
                updated_at: new Date(),
                created_at: new Date(),
            },
            tokken: 'tokken'
        };
        return of(userSession);
    }
}
