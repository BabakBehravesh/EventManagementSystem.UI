import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
}

export interface EventRequest {
    name: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
}

@Injectable({ providedIn: 'root' })
export class EventService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiUrl}/events`);
    }

    getEventById(id: number | string): Observable<Event> {
        console.log("Is that you " + `${this.apiUrl}/events/`);
        const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

        console.log("Is that you?" + numericId);
        if (isNaN(numericId)) {
            throw new Error('Invalid event ID: ' + id);
        }

        console.log("Fetching event with ID:", numericId);
        return this.http.get<Event>(`${this.apiUrl}/events/${numericId}`);
    }

    createEvent(event: EventRequest): Observable<Event> {
        return this.http.post<Event>(`${this.apiUrl}/events`, event);
    }

    getEventParticipants(eventId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/events/participants/${eventId}`);
    }
}