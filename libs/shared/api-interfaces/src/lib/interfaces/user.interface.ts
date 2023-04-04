import { UserResponse } from "../responses/user.response";
import { Entity } from "./entity.interface";

export interface User extends Entity {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  
  export interface UserSession {
    tokken: string;
    user: UserResponse;
  }