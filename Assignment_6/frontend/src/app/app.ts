
import { Component } from '@angular/core';
import { Registration } from './registration/registration';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Registration],
  template: '<app-registration></app-registration>'
})
export class App { }
