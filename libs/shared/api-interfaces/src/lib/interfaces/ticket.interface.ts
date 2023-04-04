import { Entity } from "./entity.interface";

export interface Ticket extends Entity {
  name: string;
  description: string;
  price: number;
  user_id: string;
  event_id: string;
}
