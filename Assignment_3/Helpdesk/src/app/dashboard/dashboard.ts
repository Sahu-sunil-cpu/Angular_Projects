import { Component, inject, signal } from '@angular/core';
import { Crud } from '../services/crud';
import { TicketInfo } from '../ticket';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private crudService = inject(Crud);
  private router = inject(Router);
  
  tickets = signal<TicketInfo[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  loadTickets() {
    this.loading.set(true);
    this.error.set(null);

    this.tickets.set(DUMMY_TICKETS);

    this.loading.set(false);

    // this.crudService.getTickets().subscribe({
    //   next: (data) => {
    //     this.tickets.set(data);
    //     this.loading.set(false);
    //   },
    //   error: (err) => {
    //     this.error.set('Failed to load tickets');
    //     this.loading.set(false);
    //   },
    // });
  }

  ngOnInit() {
    this.loadTickets();
  }

  createTicket() {
    this.router.navigate(['tickets/create']);
  }

  viewTicket(ticket: TicketInfo) {
    this.router.navigate(['tickets', ticket._id])
  };

  editTicket(ticket: TicketInfo) {
    this.router.navigate(['/tickets', ticket._id, 'edit'])
  }

  deleteTicket(ticket: TicketInfo) {
    this.crudService.deleteTicket(ticket._id);
  }
}


export const DUMMY_TICKETS: TicketInfo[] = [
  {
    _id: '1',
    ticketId: 'TKT-1001',
    title: 'Cannot Login',
    description: 'User cannot log in with valid credentials.',
    status: 'Open',
    priority: 'High',
    createdAt: new Date('2026-10-10'),
    updatedAt: new Date('2026-10-11'),
  },
  {
    _id: '2',
    ticketId: 'TKT-1002',
    title: 'Dashboard Not Loading',
    description: 'Dashboard page stays blank after login.',
    status: 'In Progress',
    priority: 'High',
    createdAt: new Date('2026-10-09'),
    updatedAt: new Date('2026-10-12'),
  },
  {
    _id: '3',
    ticketId: 'TKT-1003',
    title: 'Update Profile',
    description: 'User wants to update their profile information.',
    status: 'Open',
    priority: 'Medium',
    createdAt: new Date('2026-10-08'),
    updatedAt: new Date('2026-10-08'),
  },
  {
    _id: '4',
    ticketId: 'TKT-1004',
    title: 'Payment Failed',
    description: 'Payment fails when submitting the checkout form.',
    status: 'Closed',
    priority: 'Critical',
    createdAt: new Date('2026-10-07'),
    updatedAt: new Date('2026-10-10'),
  },
  {
    _id: '5',
    ticketId: 'TKT-1005',
    title: 'Forgot Password',
    description: 'Password reset email is not being received.',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: new Date('2026-10-06'),
    updatedAt: new Date('2026-10-11'),
  },
];