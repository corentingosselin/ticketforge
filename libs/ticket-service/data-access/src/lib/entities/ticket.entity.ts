import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity, Ticket } from '@ticketforge/shared/api-interfaces';

@Entity()
export class TicketEntity extends BaseEntity implements Ticket {

  @Property()
  purchasedUnitPrice!: number;

  @Property()
  quantity!: number;

  @Property()
  user_id!: string;

  @Property()
  event_id!: string;
}
