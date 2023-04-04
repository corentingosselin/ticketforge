import { Injectable } from "@nestjs/common";
import { CreateEventDto, EventResponse, UpdateEventDto } from "@ticketforge/shared/api-interfaces";
import { Observable, of } from "rxjs";

@Injectable()
export class EventService {

    createEvent(createEventDto: CreateEventDto) : Observable<EventResponse> {
        return of({
            id: '1',
            name: createEventDto.name,
            description: createEventDto.description,
            date: createEventDto.date,
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    getEvent(id: string) : Observable<EventResponse> {
        return of({
            id,
            name: 'test',
            description: 'test',
            date: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        });
    }

    deleteEvent(id: string) : Observable<boolean> {
        return of(true);
    }

    updateEvent(updateEventDto: UpdateEventDto) : Observable<EventResponse> {
        return of({
            id: '1',
            name: updateEventDto.name,
            description: updateEventDto.description,
            date: updateEventDto.date,
            created_at: new Date(),
            updated_at: new Date()    
        });
    }

}