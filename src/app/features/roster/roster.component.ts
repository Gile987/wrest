import { Component, Input, OnInit } from '@angular/core';
import { Wrestler } from 'src/app/core/models/wrestler.model';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  @Input() wrestlers!: Wrestler[];

  constructor() { }

  ngOnInit(): void {}

}
