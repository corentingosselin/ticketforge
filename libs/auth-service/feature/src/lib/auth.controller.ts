import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '@ticketforge/auth-service/data-access';
import { CreateUserDto, LoginUserDto } from '@ticketforge/shared/api-interfaces';
import {
    LOGIN_CMD,
    REGISTER_CMD
} from '@ticketforge/shared/message-broker';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @MessagePattern(REGISTER_CMD)
  async register(@Payload() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern(LOGIN_CMD)
  async login(@Payload() loginDto: LoginUserDto) {
    console.log(loginDto);
    return this.authService.login(loginDto);
  }

}
