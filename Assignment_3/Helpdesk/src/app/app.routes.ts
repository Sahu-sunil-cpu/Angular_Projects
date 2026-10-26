import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { CreateForm } from './create-form/create-form';
import { ViewForm } from './view-form/view-form';
import { EditForm } from './edit-form/edit-form';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'tickets/create', component: CreateForm },
  { path: 'tickets/:id', component: ViewForm },
  { path: 'tickets/:id/edit', component: EditForm },
  { path: '**', redirectTo: '' },
];
