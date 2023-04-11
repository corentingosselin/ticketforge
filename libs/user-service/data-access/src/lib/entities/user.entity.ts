import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity, User } from '@ticketforge/shared/api-interfaces';

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
  
}
