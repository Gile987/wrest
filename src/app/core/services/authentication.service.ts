import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usersUrl = 'assets/users.json';
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    if (this.users.length > 0) {
      return of(this.users);
    } else {
      return this.http.get<User[]>(this.usersUrl).pipe(
        tap(users => this.users = users)
      );
    }
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.post<User>(this.usersUrl, { email, password });
  }

  register(user: User): Observable<User | null> {
    return this.http.post<User>(this.usersUrl, user);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

}


