import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Registration {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    eventId: number;
}

export interface RegistrationRequest {
    name: string;
    phoneNumber?: string;
    email: string;
}

export interface RegistrationResponse {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    eventId: number;
    eventName: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getRegistrationsForEvent(eventId: number): Observable<RegistrationResponse[]> {
        return this.http.get<RegistrationResponse[]>(`${this.apiUrl}/events/${eventId}/registrations`);
    }

    registerForEvent(eventId: number, registration: RegistrationRequest): Observable<RegistrationResponse> {
        return this.http.post<RegistrationResponse>(
            `${this.apiUrl}/events/${eventId}/registrations`,
            registration
        );
    }
}