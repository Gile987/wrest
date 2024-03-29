import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  logout(): void {
    this.authenticationService.setCurrentUser(null);
    this.router.navigate(['/login']);
  }
}