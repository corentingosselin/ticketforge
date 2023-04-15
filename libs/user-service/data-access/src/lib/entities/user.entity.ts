import { BeforeCreate, BeforeUpdate, Entity, Property } from '@mikro-orm/core';
import { BaseEntity, User, UserRole } from '@ticketforge/shared/api-interfaces';
import argon2 from 'argon2';


@Entity()
export class UserEntity extends BaseEntity implements User {
  
  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property()
  password: string;

  @Property()
  role: UserRole = UserRole.USER;
  
  @BeforeCreate()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password);
    }
  }
  
}
