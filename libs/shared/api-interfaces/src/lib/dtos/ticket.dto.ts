import {
  IsCreditCard,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaymentDetails, Ticket } from '../interfaces/ticket.interface';
import { Transform } from 'class-transformer';

type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class CreateTicketDto implements Omit<Ticket, DEFAULT_OMIT> {
  @IsNumber()
  purchasedUnitPrice!: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  quantity!: number;

  @IsString()
  user_id!: string;

  @IsString()
  event_id!: string;

}

export class UpdateTicketDto implements Partial<CreateTicketDto> {
  @IsString()
  id!: string;
  
  @IsOptional()
  @IsNumber()
  purchasedUnitPrice?: number;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  event_id?: string;
}

export class PaymentDetailsDto implements PaymentDetails {
  @IsCreditCard()
  cardNumber!: string;
  @Transform(({ value }) => formatDateToISO(value), { toClassOnly: true })
  @IsDateString()
  expirationDate!: string;
  @IsString()
  cvv!: string;
}

export class PurchaseTicketDto {
  @IsNotEmpty()
  ticket!: CreateTicketDto;
  @IsNotEmpty()
  paymentDetails!: PaymentDetails;
}

function formatDateToISO(dateString: string): string {
  const [month, year] = dateString.split('/').map((item) => parseInt(item, 10));
  return `${year}-${month.toString().padStart(2, '0')}-01`;
}
