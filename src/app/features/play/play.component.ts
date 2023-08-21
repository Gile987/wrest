import { Component, OnInit } from '@angular/core';
import { TjpwRosterService } from '../../core/services/tjpw-roster.service';
import { Wrestler } from '../../core/models/wrestler.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  public wrestlers: Wrestler[] = [];
  public availableWrestlersForB: Wrestler[] = [];
  public selectedWrestlers: Wrestler[] = [];

  constructor(private rosterService: TjpwRosterService) {}

  ngOnInit(): void {
    this.rosterService.wrestlers$.subscribe((wrestlers: Wrestler[]) => {
      this.wrestlers = wrestlers;
      this.availableWrestlersForB = [...wrestlers];
    });
  }

  public selectWrestler(wrestlerId: number, wrestlerIndex: number): void {
    const selectedWrestler: Wrestler | undefined = this.wrestlers.find(
      (wrestler: Wrestler) => wrestler.id === wrestlerId
    );

    if (
      selectedWrestler &&
      this.selectedWrestlers.length < 2 &&
      !this.selectedWrestlers.includes(selectedWrestler)
    ) {
      this.selectedWrestlers[wrestlerIndex] = selectedWrestler;
      if (wrestlerIndex === 0) {
        this.availableWrestlersForB = this.availableWrestlersForB.filter(
          (wrestler: Wrestler) => wrestler.id !== wrestlerId
        );
      }
    }
  }

  public simulateMatch(): void {
    if (this.selectedWrestlers.length === 2) {
    }
  }
}
