import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee';

interface Department {
  name: string;
  description: string;
  employeeCount: number;
}

@Component({
  selector: 'app-departments',
  imports: [CommonModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments implements OnInit {
  loading = false;
  errorMessage = '';

  departments: Department[] = [
    {
      name: 'Engineering',
      description: 'Develops and maintains software applications.',
      employeeCount: 0
    },
    {
      name: 'HR',
      description: 'Manages recruitment and employee relations.',
      employeeCount: 0
    },
    {
      name: 'Marketing',
      description: 'Handles promotions, campaigns, and branding.',
      employeeCount: 0
    },
    {
      name: 'Finance',
      description: 'Manages budgets and financial records.',
      employeeCount: 0
    },
    {
      name: 'Design',
      description: 'Creates user interfaces and visual designs.',
      employeeCount: 0
    },
    {
      name: 'Sales',
      description: 'Builds customer relationships and drives sales.',
      employeeCount: 0
    }
  ];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadDepartmentCounts();
  }

  loadDepartmentCounts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.departments = this.departments.map((department) => ({
          ...department,
          employeeCount: response.employees.filter(
            employee => employee.department === department.name
          ).length
        }));

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load department information.';
        this.loading = false;
      }
    });

  }
}
