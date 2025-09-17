import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsContainerComponent } from './events-container/events-container.component';

@NgModule({
  declarations: [
    EventListComponent,
    EventCreateComponent,
    EventDetailComponent,
    EventsContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }