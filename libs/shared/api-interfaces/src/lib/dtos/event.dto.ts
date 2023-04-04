import { IsDate, IsString } from 'class-validator';
import { Event } from '../interfaces/event.interface';

type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class CreateEventDto implements Omit<Event, DEFAULT_OMIT> {
  @IsString()
  name!: string;
  @IsString()
  description!: string;
  @IsDate()
  date!: Date;
  @IsString()
  user_id!: string;
}

export class UpdateEventDto implements Partial<CreateEventDto> {
  @IsString()
  name?: string;
  @IsString()
  description?: string;
  @IsDate()
  date?: Date;
  @IsString()
  user_id?: string;
}
