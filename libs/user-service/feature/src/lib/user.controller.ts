import { HotelServiceUsersService } from '@lofi/hotel-service/feature-user/data-access';
import { CreateUserDto, CREATE_USER_CMD, FIND_USER_BY_ID_CMD, LoginUserDto, UserResponse, VALIDATE_USER_CMD } from '@lofi/shared/api-interfaces';
import { Controller, UnauthorizedException } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(
    private readonly rmqService: RmqService,
    private readonly userService: HotelServiceUsersService,
  ) {}


  @MessagePattern(VALIDATE_USER_CMD)
  async validateUser(@Payload() loginDto: LoginUserDto) {
    const isUserValid = await this.userService.validateUser(
      loginDto.email,
      loginDto.password
    );
    return isUserValid;
  }

  @MessagePattern(CREATE_USER_CMD)
  async createUser(@Payload()createUser: CreateUserDto) {
    
  }

  @MessagePattern(FIND_USER_BY_ID_CMD)
  async findUserById(@Payload() userId: number) {
    const user = await this.userService.findById(userId) as UserResponse;
    return user;
  }
}