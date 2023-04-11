import { IsNumber, IsString } from 'class-validator';
import { Ticket } from '../interfaces/ticket.interface';

type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class CreateTicketDto implements Omit<Ticket, DEFAULT_OMIT> {
  @IsString()
  name!: string;
  @IsString()
  title!: string;
  @IsString()
  description!: string;
  @IsNumber()
  price!: number;
  @IsString()
  user_id!: string;
  @IsString()
  event_id!: string;
}

export class UpdateTicketDto implements Partial<CreateTicketDto> {
  @IsString()
  id!: string;
  @IsString()
  name?: string;
  @IsString()
  title?: string;
  @IsString()
  description?: string;
  @IsNumber()
  price?: number;
  @IsString()
  user_id?: string;
  @IsString()
  event_id?: string;
}
