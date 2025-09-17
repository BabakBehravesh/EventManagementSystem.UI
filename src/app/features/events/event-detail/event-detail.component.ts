import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService, Event } from '../../../core/services/event.service';
import { RegistrationService, RegistrationRequest, RegistrationResponse } from '../../../core/services/registration.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
    event!: Event;
    registrations: RegistrationResponse[] = [];
    registrationForm: FormGroup;
    loading = true;
    regLoading = false;
    error = '';
    showRegistrationForm = false;
    isEventCreator = false;

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
        private registrationService: RegistrationService,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.registrationForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['']
        });
    }

    ngOnInit(): void {
        const eventId = this.route.snapshot.paramMap.get('id');
        if (eventId) {
            this.loadEvent(+eventId);
            this.isEventCreator = this.authService.isEventCreator();
            if (this.isEventCreator) {
                this.loadRegistrations(+eventId);
            }
        }
    }

    loadEvent(eventId: number): void {
        this.eventService.getEventById(eventId).subscribe({
            next: (event) => {
                this.event = event;
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Event not found';
                this.loading = false;
            }
        });
    }

    loadRegistrations(eventId: number): void {
        this.registrationService.getRegistrationsForEvent(eventId).subscribe({
            next: (registrations) => {
                this.registrations = registrations;
            },
            error: (error) => {
                console.error('Error loading registrations:', error);
            }
        });
    }

    onRegister(): void {
        if (this.registrationForm.valid && this.event) {
            this.regLoading = true;
            const registrationData: RegistrationRequest = this.registrationForm.value;

            this.registrationService.registerForEvent(this.event.id, registrationData).subscribe({
                next: (response) => {
                    this.registrationForm.reset();
                    this.showRegistrationForm = false;
                    this.regLoading = false;
                    alert('Registration successful!');
                },
                error: (error) => {
                    this.error = error.error?.message || 'Registration failed';
                    this.regLoading = false;
                }
            });
        }
    }

    toggleRegistrationForm(): void {
        this.showRegistrationForm = !this.showRegistrationForm;
    }
}