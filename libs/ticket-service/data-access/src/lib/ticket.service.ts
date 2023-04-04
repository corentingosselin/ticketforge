import { Injectable } from "@nestjs/common";
import { CreateTicketDto, TicketResponse, UpdateTicketDto } from "@ticketforge/shared/api-interfaces";
import { Observable, of } from "rxjs";

@Injectable()
export class TicketService {

    createTicket(createTicketDto: CreateTicketDto) : Observable<TicketResponse> {
        return of({
            id: '1',
            name: createTicketDto.name,
            description: createTicketDto.description,
            price: createTicketDto.price,
            event_id: createTicketDto.event_id,
            user_id: createTicketDto.user_id,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    getTicket(id: string) : Observable<TicketResponse> {
        return of({
            id,
            name: 'test',
            description: 'test',
            price: 10,
            event_id: '1',
            user_id: '2',
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    deleteTicket(id: string) : Observable<boolean> {
        return of(true);
    }

    updateTicket(updateTicketDto: UpdateTicketDto) : Observable<TicketResponse> {
        return of({
            id: '1',
            name: updateTicketDto.name,
            description: updateTicketDto.description,
            price: updateTicketDto.price,
            event_id: updateTicketDto.event_id,
            user_id: updateTicketDto.user_id,
            created_at: new Date(),
            updated_at: new Date()    
        });
    }
    

}