import { User } from '../interfaces/user.interface';

export type UserResponse = Omit<User, 'confirmPassword'>;
export type UserAccountResponse = Omit<UserResponse, 'password'>;

