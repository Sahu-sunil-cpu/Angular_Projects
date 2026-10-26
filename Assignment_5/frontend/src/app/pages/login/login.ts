import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from "@angular/router"
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  message = '';

  onSubmit(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.message = 'Please enter your email and password.';
      return;
    }

    this.message =
      'Login UI is ready.............';

  }
}
