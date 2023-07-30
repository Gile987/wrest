import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usersUrl = 'assets/users.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.post<User>(this.usersUrl, { email, password });
  }

  register(user: User): Observable<User | null> {
    return this.http.post<User>(this.usersUrl, user);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

}


