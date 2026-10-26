
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  _id?: string; // for mogodb purpose
  externalId?: number;
  id?: number;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:5000/api/users';

  private readonly http = inject(HttpClient);

  // Fetch 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Fetch 
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Create 
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update
  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Delete
  deleteUser(id: string): Observable<{ message: string; user: User }> {
    return this.http.delete<{ message: string; user: User }>(
      `${this.apiUrl}/${id}`
    );
  }
}
