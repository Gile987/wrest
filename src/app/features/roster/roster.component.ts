import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Wrestler } from 'src/app/core/models/wrestler.model';
import { UserService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  @Input() wrestlers!: Wrestler[];
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

}
