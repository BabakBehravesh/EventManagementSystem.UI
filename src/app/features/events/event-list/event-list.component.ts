import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../../core/services/event.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
    events: Event[] = [];
    loading = true;
    error = '';

    constructor(
        private eventService: EventService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadEvents();
    }

    loadEvents(): void {
        this.eventService.getEvents().subscribe({
            next: (events) => {
                this.events = events;
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load events';
                this.loading = false;
                console.error('Error loading events:', error);
            }
        });
    }

    get isEventCreator(): boolean {
        return this.authService.isEventCreator();
    }
}