import { User } from '../interfaces/user.interface';

export type UserResponse = User;
export type UserAccountResponse = Omit<User, 'password'>;

