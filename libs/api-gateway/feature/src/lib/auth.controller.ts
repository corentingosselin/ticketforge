import {
    Controller,
    Post,
    Body,
  } from '@nestjs/common';
import { AuthService } from '@ticketforge/api-gateway/data-access';
import { LoginUserDto, CreateUserDto } from '@ticketforge/shared/api-interfaces';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
      console.log(loginUserDto);
      return this.authService.login(loginUserDto);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }

  }
  