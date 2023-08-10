import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      nickname: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  registerUser(): void {
    if (this.registrationForm.invalid || this.passwordsDoNotMatch()) {
      return;
    }

    const newUser: User = this.registrationForm.value;
    this.authenticationService.registerUser(newUser).subscribe(
      (user: User | null) => {
        if (user) {
          console.log('User registered');
        } else {
          console.log('User not registered');
        }
      }
    );
  }

  passwordsDoNotMatch(): boolean {
    const password: string = this.registrationForm.get('password')?.value;
    const confirmPassword: string = this.registrationForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }
}
