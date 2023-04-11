import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity, Event } from '@ticketforge/shared/api-interfaces';

@Entity()
export class EventEntity extends BaseEntity implements Event {
  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  maximumTickets!: number;

  @Property()
  date!: Date;
}
