
import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Crud } from '../services/crud';
import { TicketInfo } from '../ticket';

@Component({
  selector: 'app-view-form',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './view-form.html',
  styleUrl: './view-form.css',
})
export class ViewForm {
  private route = inject(ActivatedRoute);
  private crudService = inject(Crud);

  ticket = signal<TicketInfo | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadTicket();
  }

  loadTicket() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Ticket ID is missing.');
      this.loading.set(false);
      return;
    }

    this.crudService.getTicketsById(id).subscribe({
      next: (data) => {
        this.ticket.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load ticket details.');
        this.loading.set(false);
      },
    });
  }
}
