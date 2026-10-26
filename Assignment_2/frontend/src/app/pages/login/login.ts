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
  message = '';

  onLogin(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.message = '';
      return;
    }

    //this.message = 'Form submitted successfully! (Demo only)';
  }
}
