
import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Employees } from './pages/employees/employees';
import { Departments } from './pages/departments/departments';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'employees', component: Employees },
    { path: 'departments', component: Departments },
    { path: 'about', component: About },
    { path: 'login', component: Login },
    { path: '404', component: NotFound },
    { path: '**', redirectTo: '404' }
];
