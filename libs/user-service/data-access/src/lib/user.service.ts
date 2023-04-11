import { EntityManager, MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import {
    CreateUserDto,
    UpdateUserDto,
    UserResponse,
} from '@ticketforge/shared/api-interfaces';
import { Observable, of } from 'rxjs';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly orm: MikroORM,
  ) {}

  private readonly userRepository = this.orm.em.getRepository(UserEntity);

  @UseRequestContext()
  async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;

    const user = new UserEntity();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
 

    await this.userRepository.persist(user).flush();

    return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        created_at: user.created_at,
        updated_at: user.updated_at,
    } as UserResponse;
  }

  getUser(id: string): Observable<UserResponse> {
    return of({
      id: id,
      email: 'john.doe@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  deleteUser(id: string): Observable<boolean> {
    return of(true);
  }

  updateUser(updateUserDto: UpdateUserDto): Observable<UserResponse> {
    return of({
      id: '1',
      email: updateUserDto.email,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
