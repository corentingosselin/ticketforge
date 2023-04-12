import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';
import { Event } from '../interfaces/event.interface';

type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class CreateEventDto implements Omit<Event, DEFAULT_OMIT> {
  @IsString()
  name!: string;
  @IsString()
  city!: string;
  @IsString()
  description!: string;
  @IsDateString()
  date!: Date;
  @IsNumber()
  maximumTickets!: number;
}

export class UpdateEventDto implements Partial<CreateEventDto> {
  @IsString()
  id!: string;
  @IsString()
  city?: string;
  @IsString()
  name?: string;
  @IsString()
  description?: string;
  @IsDate()
  date?: Date;
  @IsNumber()
  maximumTickets?: number;
}
