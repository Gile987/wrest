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
  public selectedWrestlers: (Wrestler | null)[] = [null, null];
  public wrestlerSelectedInColumnA: boolean = false;

  constructor(private rosterService: TjpwRosterService) {}

  ngOnInit(): void {
    this.subscribeToWrestlers();
  }

  private subscribeToWrestlers(): void {
    this.rosterService.wrestlers$.subscribe((wrestlers: Wrestler[]) => {
      this.wrestlers = wrestlers;
      this.availableWrestlersForB = [...wrestlers];
    });
  }

  public selectWrestler(wrestlerId: number, wrestlerIndex: number): void {
    const selectedWrestler = this.wrestlers.find(
      (wrestler: Wrestler) => wrestler.id === wrestlerId
    );

    if (wrestlerIndex === 0) {
      this.wrestlerSelectedInColumnA = true;
      this.selectedWrestlers[wrestlerIndex] = selectedWrestler || null;
      this.availableWrestlersForB = this.wrestlers.filter(
        (wrestler: Wrestler) => wrestler.id !== wrestlerId
      );

      this.selectedWrestlers[1] = null;
    } else if (wrestlerIndex === 1 && this.wrestlerSelectedInColumnA) {
      if (
        selectedWrestler &&
        this.selectedWrestlers.length < 2 &&
        !this.selectedWrestlers.includes(selectedWrestler)
      ) {
        this.selectedWrestlers[wrestlerIndex] = selectedWrestler;
      }
    }
  }

  public simulateMatch(): void {
    if (this.selectedWrestlers.length === 2) {
    }
  }
}
