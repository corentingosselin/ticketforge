import { Entity } from "./entity.interface";

export interface User extends Entity {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
  }

  export enum UserRole {
    ADMIN = 'admin',
    OPERATOR = 'operator',
    USER = 'user'
  }

  export interface JwtUserSession {
    sub: string;
    email: string;
    exp?: number;
    iat?: number;
    role: UserRole;
  }
  