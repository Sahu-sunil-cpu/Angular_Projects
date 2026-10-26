import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Employee {
  _id: string;
  name: string;
  department: string;
  salary: number;
}

export interface EmployeeResponse {
  count: number;
  employees: Employee[];
}


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(
    search = '',
    department = 'All',
    sort = ''
  ): Observable<EmployeeResponse> {
    let params = new HttpParams();  // for setting parameter in url

    if (search.trim()) {
      params = params.set('search', search.trim());
    }

    if (department !== 'All') {
      params = params.set('department', department);
    }

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http.get<EmployeeResponse>(this.apiUrl, { params });
  }
}
