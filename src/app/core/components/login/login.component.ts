import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  users: User[] = [];
  isAuthenticated = false;
  private authSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.authSubscription = this.authService.getCurrentUser().subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private loadUsers(): void {
    this.authService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.authenticateUser(email, password).subscribe((user) => {
        if (user) {
          console.log('User logged in');
          this.router.navigate(['']);
        } else {
          console.log('User not found or wrong password');
        }
      });
    }
  }
}
