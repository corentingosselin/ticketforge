import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity, Event } from '@ticketforge/shared/api-interfaces';

@Entity()
export class EventEntity extends BaseEntity implements Event {
  @Property()
  name!: string;

  @Property()
  city!: string;

  @Property()
  description!: string;

  @Property()
  maximumTickets!: number;

  @Property({ default: 0 as number})
  ticketsSold!: number;

  @Property()
  ticketPrice!: number;

  @Property()
  date!: Date;
}
