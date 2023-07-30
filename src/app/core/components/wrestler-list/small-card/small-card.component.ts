import { Component, Input } from '@angular/core';
import { Wrestler } from 'src/app/core/models/wrestler.model';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss']
})
export class SmallCardComponent {
  @Input() wrestler!: Wrestler;
}
