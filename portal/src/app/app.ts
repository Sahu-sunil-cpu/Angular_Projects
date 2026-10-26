import { Component } from '@angular/core';
import { PORTAL_ACCESS_CODE } from './portal-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  code = '';
  verified = false;
  error = '';

  assignments = [
    { number: 1, name: 'E-Commerce Cart', category: 'Shopping', path: '/assignment-1/' },
    { number: 2, name: 'Form Development', category: 'Forms', path: '/assignment-2/' },
    { number: 3, name: 'Helpdesk Management', category: 'Helpdesk', path: '/assignment-3/' },
    { number: 4, name: 'CRUD Operations', category: 'Database', path: '/assignment-4/' },
    { number: 5, name: 'Employee Search & Filter', category: 'Filtering', path: '/assignment-5/' },
    { number: 6, name: 'Reactive Registration Form', category: 'Forms', path: '/assignment-6/' },
    { number: 7, name: 'Angular Practical 7', category: 'Angular', path: '/assignment-7/' },
    { number: 8, name: 'Inventory Management', category: 'Inventory', path: '/assignment-8/' },
  ];

  verify(): void {
    if (this.code.trim() === PORTAL_ACCESS_CODE) {
      this.verified = true;
      this.error = '';
    } else {
      this.error = 'Incorrect code. Please try again.';
    }
  }

  logout(): void {
    this.verified = false;
    this.code = '';
    this.error = '';
  }
}