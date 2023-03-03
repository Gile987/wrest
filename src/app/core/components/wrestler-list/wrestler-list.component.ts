import { Component, OnInit } from '@angular/core';
import { Wrestler } from '../../models/wrestler.model';
import { TjpwRosterService } from '../../services/tjpw-roster.service';

@Component({
  selector: 'app-wrestler-list',
  templateUrl: './wrestler-list.component.html',
  styleUrls: ['./wrestler-list.component.scss']
})
export class WrestlerListComponent implements OnInit {
  wrestlers: Wrestler[] = [];

  constructor(private rosterService: TjpwRosterService) {}

  ngOnInit(): void {
    this.rosterService.wrestlers$.subscribe(wrestlers => {
      this.wrestlers = wrestlers;
      console.log(this.wrestlers); // make sure data is being correctly assigned to component variable
    });
  }
}