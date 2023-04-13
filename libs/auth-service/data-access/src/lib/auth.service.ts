import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CreateUserDto,
  LoginUserDto,
  USER_SERVICE,
  User,
  UserAccountResponse,
  UserResponse,
  UserSessionResponse,
} from '@ticketforge/shared/api-interfaces';
import {
  CREATE_USER_CMD,
  FIND_USER_BY_EMAIL,
} from '@ticketforge/shared/message-broker';
import { RpcService } from '@ticketforge/shared/network';
import { verify } from 'argon2';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly rpcService: RpcService;
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    private readonly jwtService: JwtService
  ) {
    this.rpcService = new RpcService(this.userService);
  }

  async validateUser(loginDto: LoginUserDto): Promise<UserAccountResponse> {
    const user = await this.rpcService.sendWithRpcExceptionHandler<User>(FIND_USER_BY_EMAIL,loginDto.email);
    console.log(user);
    if (user && (await verify(user.password, loginDto.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async generateJwtToken(
    user: UserAccountResponse
  ): Promise<UserSessionResponse> {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user,
    } as UserSessionResponse;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new RpcException(
        new UnauthorizedException('Invalid email or password.')
      );
    }

    return this.generateJwtToken(user);
  }

  async register(registerDto: CreateUserDto) {
    const user: User = await this.rpcService.sendWithRpcExceptionHandler<User>(
      CREATE_USER_CMD,
      registerDto
    );
    return this.generateJwtToken(user);
  }
}
