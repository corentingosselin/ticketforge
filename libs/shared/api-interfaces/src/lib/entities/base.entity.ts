import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Entity } from '../interfaces/entity.interface';


export abstract class BaseEntity implements Entity {

  @PrimaryKey()
  id: string = v4();

  @Property()
  created_at: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at: Date = new Date();
  
}
