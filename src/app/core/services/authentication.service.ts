import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private usersUrl = '/assets/users.json';
  private users: User[] = [];

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

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

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  authenticateUser(email: string, password: string): Observable<User | null> {
    const user = this.users.find((u) => u.email === email && u.password === password);
    this.setCurrentUser(user || null);
    return of(user || null);
  }

  register(user: User): Observable<User | null> {
    return this.http.post<User>(this.usersUrl, user);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
