import { Component, OnInit } from '@angular/core';
import { TjpwRosterService } from '../../core/services/tjpw-roster.service';
import { Wrestler } from '../../core/models/wrestler.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  wrestlers: Wrestler[] = [];
  selectedWrestlers: Wrestler[] = [];

  constructor(private rosterService: TjpwRosterService) {}

  ngOnInit(): void {
    this.rosterService.wrestlers$.subscribe((wrestlers) => {
      this.wrestlers = wrestlers;
    });
  }

  selectWrestler(event: any): void {
    const wrestlerId = event.target.value;
    if (wrestlerId) {
      const selectedWrestler = this.wrestlers.find(
        (wrestler) => wrestler.id === Number(wrestlerId)
      );
      if (selectedWrestler && this.selectedWrestlers.length < 2) {
        this.selectedWrestlers.push(selectedWrestler);
      }
    }
  }

  simulateMatch(): void {
    if (this.selectedWrestlers.length === 2) {
    }
  }
}
