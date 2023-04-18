import { Entity } from "./entity.interface";

export interface Ticket extends Entity {
  purchasedPrice: number;
  user_id: string;
  event_id: string;
}
