import { Entity } from "./entity.interface";

export interface Event extends Entity {
  name: string;
  city: string;
  description: string;
  maximumTickets: number;
  ticketPrice: number;
  date: Date;
}
