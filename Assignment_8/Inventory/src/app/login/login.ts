
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  username = '';
  password = '';

  login(): void {
    if (!this.username.trim() || !this.password) {
      this.toastr.warning('Please enter your username and password.');
      return;
    }

    const success = this.authService.login(
      this.username.trim(),
      this.password
    );

    if (success) {
      this.toastr.success('Login successful!');
      this.router.navigate(['/dashboard']);
    } else {
      this.toastr.error('Invalid username or password.');
    }
  }
}
