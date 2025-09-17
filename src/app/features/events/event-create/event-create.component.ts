import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService, EventRequest } from '../../../core/services/event.service';

@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html',
    styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
    eventForm: FormGroup;
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private eventService: EventService,
        private router: Router
    ) {
        this.eventForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            location: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.eventForm.valid) {
            this.loading = true;
            const eventData: EventRequest = this.eventForm.value;

            this.eventService.createEvent(eventData).subscribe({
                next: () => {
                    this.router.navigate(['/events']);
                },
                error: (error) => {
                    this.error = error.error?.message || 'Failed to create event';
                    this.loading = false;
                }
            });
        }
    }
}