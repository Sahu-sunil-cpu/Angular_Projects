import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  employees: Employee[] = [];
  count = 0;

  searchText = '';
  selectedDepartment = 'All';
  sortOrder = '';

  departments = [
    'Engineering',
    'HR',
    'Design',
    'Marketing'
  ];

  loading = false;
  errorMessage = '';

  constructor(private employeeService: EmployeeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.errorMessage = '';

    this.employeeService
      .getEmployees(
        this.searchText,
        this.selectedDepartment,
        this.sortOrder
      )
      .subscribe({
        next: (response) => {
          this.employees = response.employees;
          this.count = response.count;
          this.loading = false;
          this.cdr.detectChanges()
        },
        error: () => {
          this.errorMessage =
            'Could not load employees. Please check the backend server.';
          this.loading = false;
          this.cdr.detectChanges()
        }


      });

  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedDepartment = 'All';
    this.sortOrder = '';
    this.loadEmployees();
  }
}
