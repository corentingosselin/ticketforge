import { User } from "../interfaces/user.interface";

export type UserResponse = Omit<User,'password'>
    