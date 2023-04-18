import { Entity } from "./entity.interface";

export interface Ticket extends Entity {
  purchasedUnitPrice: number;
  quantity: number;
  user_id: string;
  event_id: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}
