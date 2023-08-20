import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public users: User[] = [];
  public isAuthenticated: boolean = false;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadUsers(): void {
    this.authenticationService
      .getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  public login(): void {
    if (this.loginForm.valid) {
      const email: string = this.loginForm.get('email')?.value;
      const password: string = this.loginForm.get('password')?.value;

      this.authenticationService
        .authenticateUser(email, password)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((user: User | null) => {
          if (user) {
            console.log('User logged in');
            this.router.navigate(['']);
          } else {
            console.log('User not found or wrong password');
          }
        });
    }
  }

  private getCurrentUser(): void {
    this.authenticationService
      .getCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | null) => {
        this.isAuthenticated = Boolean(user);
      });
  }
}
