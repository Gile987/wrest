import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wrestler } from 'src/app/core/models/wrestler.model';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-wrestler-modal',
  templateUrl: './wrestler-modal.component.html',
  styleUrls: ['./wrestler-modal.component.scss']
})
export class WrestlerModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public wrestler: Wrestler) { }

  ngOnInit(): void {
  }

}
