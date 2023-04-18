import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
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
  @IsOptional()
  @IsNumber()
  ticketsSold?: number;
  @IsNumber()
  ticketPrice!: number;
}

export class UpdateEventDto implements Partial<CreateEventDto> {
  @IsString()
  id!: string;
  
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsNumber()
  maximumTickets?: number;

  @IsOptional()
  @IsNumber()
  ticketPrice?: number;
}
