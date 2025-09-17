import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  { path: 'create', component: EventCreateComponent }, // Specific first
  { path: ':id', component: EventDetailComponent },    // Parameter second  
  { path: '', component: EventListComponent, pathMatch: 'full' } // Default last
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }