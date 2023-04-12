import { Entity } from "./entity.interface";

export interface User extends Entity {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  export interface JwtUserSession {
    userId: number;
    email: string;
    exp?: number;
    iat?: number;
  }
  