import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null> = null!; 

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user$ = this.authenticationService.getCurrentUser(); 
  }

}
