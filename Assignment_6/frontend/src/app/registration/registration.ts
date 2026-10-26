import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  registrationForm: FormGroup;

  submitted = false;

  // Country, State and City data
  countries = ['India', 'USA', 'Canada'];

  states: { [key: string]: string[] } = {
    India: ['Uttar Pradesh', 'Delhi', 'Maharashtra'],
    USA: ['California', 'Texas', 'Florida'],
    Canada: ['Ontario', 'Quebec', 'Alberta']
  };

  cities: { [key: string]: string[] } = {
    'Uttar Pradesh': ['Noida', 'Lucknow', 'Agra'],
    Delhi: ['New Delhi', 'Dwarka', 'Rohini'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],

    California: ['Los Angeles', 'San Francisco', 'San Diego'],
    Texas: ['Houston', 'Austin', 'Dallas'],
    Florida: ['Miami', 'Orlando', 'Tampa'],

    Ontario: ['Toronto', 'Ottawa', 'Hamilton'],
    Quebec: ['Montreal', 'Quebec City', 'Laval'],
    Alberta: ['Calgary', 'Edmonton', 'Red Deer']
  };

  availableStates: string[] = [];
  availableCities: string[] = [];

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-Z ]+$/)
          ]
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[6-9]\d{9}$/)
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
            )
          ]
        ],

        confirmPassword: [
          '',
          [Validators.required]
        ],

        gender: [
          '',
          [Validators.required]
        ],

        country: [
          '',
          [Validators.required]
        ],

        state: [
          { value: '', disabled: true },
          [Validators.required]
        ],

        city: [
          { value: '', disabled: true },
          [Validators.required]
        ]
      },
      {
        validators: this.passwordMatchValidator()
      }
    );
  }

  // Custom password match validator
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (!confirmPassword) {
        return null;
      }

      return password === confirmPassword
        ? null
        : { passwordMismatch: true };
    };
  }

  // When country changes
  onCountryChange(): void {
    const country = this.registrationForm.get('country')?.value;

    this.availableStates = this.states[country] || [];
    this.availableCities = [];

    this.registrationForm.patchValue({
      state: '',
      city: ''
    });

    const stateControl = this.registrationForm.get('state');
    const cityControl = this.registrationForm.get('city');

    stateControl?.reset('');
    cityControl?.reset('');

    if (country) {
      stateControl?.enable();
    } else {
      stateControl?.disable();
    }

    cityControl?.disable();
  }

  // When state changes
  onStateChange(): void {
    const state = this.registrationForm.get('state')?.value;

    this.availableCities = this.cities[state] || [];

    const cityControl = this.registrationForm.get('city');

    cityControl?.reset('');

    if (state) {
      cityControl?.enable();
    } else {
      cityControl?.disable();
    }
  }

  // Convenient access to form controls in HTML
  get f() {
    return this.registrationForm.controls;
  }

  // Submit form
  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    console.log(
      'Registration Details:',
      this.registrationForm.getRawValue()
    );

    alert('Registration successful!');

    this.registrationForm.reset();
    this.availableStates = [];
    this.availableCities = [];
    this.submitted = false;

    this.registrationForm.get('state')?.disable();
    this.registrationForm.get('city')?.disable();
  }
}
