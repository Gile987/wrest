import { Component, Input } from '@angular/core';
import { Wrestler } from 'src/app/core/models/wrestler.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() wrestler!: Wrestler;
}
