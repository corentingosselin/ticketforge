import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto, User, UserResponse } from "@ticketforge/shared/api-interfaces";
import { Observable, of } from "rxjs";

@Injectable()
export class UserService {

    createUser(createUserDto: CreateUserDto) : Observable<UserResponse> {
        return of({
            id: '1',
            email: createUserDto.email,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    getUser(id: string) : Observable<UserResponse> {
        return of({
            id: id,
            email: 'john.doe@mail.com',
            firstName: 'John',
            lastName: 'Doe',
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    deleteUser(id: string) : Observable<boolean> {
        return of(true);
    }

    updateUser(updateUserDto: UpdateUserDto) : Observable<UserResponse> {
        return of({
            id: '1',
            email: updateUserDto.email,
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    

}