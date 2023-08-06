import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: User[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
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

      const user = this.authService.authenticateUser(email, password);

      if (user) {
        console.log('User logged in');
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['']);
      } else {
        console.log('User not found or wrong password');
      }
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
