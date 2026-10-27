
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
    {
      number: 1,
      name: 'E-Commerce Cart',
      category: 'Shopping',
      description: 'Explore the shopping cart and e-commerce functionality.',
      url: 'https://angular-projects-two.vercel.app/cart',
    },
    {
      number: 2,
      name: 'Form Development',
      category: 'Forms',
      description: 'Explore the Angular form development practical.',
      url: 'https://angular-projects-clxe.vercel.app/dashboard',
    },
    {
      number: 3,
      name: 'Helpdesk Management',
      category: 'Helpdesk',
      description: 'Explore the helpdesk management application.',
      url: 'https://angular-projects-xkeh-theta.vercel.app/',
    },
    {
      number: 4,
      name: 'CRUD Operations',
      category: 'Database',
      description: 'Explore user management and CRUD operations.',
      url: 'https://angular-projects-kgam.vercel.app/users',
    },
    {
      number: 5,
      name: 'Employee Search & Filter',
      category: 'Filtering',
      description: 'Search, filter, and sort employee records.',
      url: 'https://angular-projects-mrt1.vercel.app/dashboard',
    },
    {
      number: 6,
      name: 'Reactive Registration Form',
      category: 'Reactive Forms',
      description: 'Explore reactive forms and form validation.',
      url: 'https://angular-projects-m4wy.vercel.app/',
    },
    {
      number: 7,
      name: 'Angular Practical 7',
      category: 'Angular',
      description: 'Explore the seventh Angular practical assignment.',
      url: 'https://angular-projects-46l9.vercel.app/',
    },
    {
      number: 8,
      name: 'Inventory Management',
      category: 'Inventory',
      description: 'Explore the inventory management application.',
      url: 'https://angular-projects-tgpg-beryl.vercel.app/login',
    },
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
