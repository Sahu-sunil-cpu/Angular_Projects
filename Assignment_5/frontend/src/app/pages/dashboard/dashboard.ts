import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  employees: Employee[] = [];
  loading = false;
  errorMessage = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response.employees;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load dashboard data.';
        this.loading = false;
      }
    });

  }

  get totalEmployees(): number {
    return this.employees.length;
  }

  get totalDepartments(): number {
    return new Set(this.employees.map(e => e.department)).size;
  }

  get averageSalary(): number {
    if (!this.employees.length) return 0;

    return this.employees.reduce(
      (total, employee) => total + employee.salary, 0
    ) / this.employees.length;

  }

  get departmentStats(): { name: string; count: number }[] {
    const counts = new Map<string, number>();

    this.employees.forEach(employee => {
      counts.set(
        employee.department,
        (counts.get(employee.department) || 0) + 1
      );
    });

    return Array.from(counts, ([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

  }
}
