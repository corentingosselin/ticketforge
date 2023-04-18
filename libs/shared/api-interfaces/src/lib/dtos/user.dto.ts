import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../interfaces/user.interface';
import { IsPasswordSecure, Match } from '@ticketforge/shared/utils';

type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class CreateUserDto implements Omit<User, DEFAULT_OMIT | 'role'> {
  
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @IsPasswordSecure()
  password!: string;

  @IsString()
  @Match('password')
  confirmPassword!: string;
}

export class UpdateUserDto implements Partial<CreateUserDto> {
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @IsPasswordSecure()
  password?: string;

  @IsOptional()
  @IsString()
  @Match('password')
  confirmPassword?: string;
}
