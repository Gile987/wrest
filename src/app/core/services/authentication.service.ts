import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject, catchError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private usersUrl: string = '/assets/users.json';
  private users: User[] = [];

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
  }

  getUsers(): Observable<User[]> {
    if (this.users.length > 0) {
      return of(this.users);
    } else {
      return this.http.get<User[]>(this.usersUrl).pipe(
        tap((users: User[]) => this.users = users)
      );
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  authenticateUser(email: string, password: string): Observable<User | null> {
    const user: User | undefined = this.users.find((u: User) => u.email === email && u.password === password);

    if (user) {
      this.setCurrentUser(user);
      return of(user);
    } else {
      this.setCurrentUser(null);
      return of(null);
    }
  }

  registerUser(user: User): Observable<User | null> {
    return this.http.post<User>('/api/register', user).pipe(
      catchError((error: any) => {
        console.error('Error while registering user:', error);
        return of(null);
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
