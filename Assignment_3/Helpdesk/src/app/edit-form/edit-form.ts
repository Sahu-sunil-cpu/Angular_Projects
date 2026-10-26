
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Crud } from '../services/crud';
import { TicketInfo } from '../ticket';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.css',
})
export class EditForm {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private crudService = inject(Crud);
  private fb = inject(FormBuilder);

  loading = signal(true);
  saving = signal(false);
  error = signal<string | null>(null);

  ticketForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    status: ['Open', Validators.required],
    priority: ['Medium', Validators.required],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Ticket ID is missing.');
      this.loading.set(false);
      return;
    }

    this.crudService.getTicketsById(id).subscribe({
      next: (ticket: TicketInfo) => {
        this.ticketForm.patchValue({
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          priority: ticket.priority,
        });

        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load ticket.');
        this.loading.set(false);
      },
    });
  }

  saveChanges() {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('Ticket ID is missing.');
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    this.crudService.updateTicket(id, this.ticketForm.getRawValue()).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/tickets', id]);
      },
      error: () => {
        this.error.set('Failed to update ticket. Please try again.');
        this.saving.set(false);
      },
    });
  }
}
