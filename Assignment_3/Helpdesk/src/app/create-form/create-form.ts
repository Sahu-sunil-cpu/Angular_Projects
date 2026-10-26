
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Crud } from '../services/crud';
import { TicketInfo } from '../ticket';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-form.html',
  styleUrl: './create-form.css',
})
export class CreateForm {
  private router = inject(Router);
  private crudService = inject(Crud);
  private fb = inject(FormBuilder);

  saving = signal(false);
  error = signal<string | null>(null);

  ticketForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    status: ['Open', Validators.required],
    priority: ['Medium', Validators.required],
  });

  submitTicket() {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    // Build the ticket payload from the form.
    const ticket = this.ticketForm.getRawValue() as TicketInfo;

    this.crudService.createTicket(ticket).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Create ticket error:', err);
        this.error.set('Failed to create ticket. Please try again.');
        this.saving.set(false);
      },
    });
  }
}
