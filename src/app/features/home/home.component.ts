import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.updateUser();
  }

  private updateUser(): void {
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
  }
}
