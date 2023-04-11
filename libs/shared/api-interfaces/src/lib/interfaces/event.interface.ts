import { Entity } from "./entity.interface";

export interface Event extends Entity {
  name: string;
  description: string;
  maximumTickets: number;
  date: Date;
}
