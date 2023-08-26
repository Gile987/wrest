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
  public simulationMessages: string[] = [];

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
    const selectedWrestler: Wrestler | undefined = this.wrestlers.find(
      (wrestler: Wrestler) => wrestler.id === wrestlerId
    );

    if (wrestlerIndex === 0) {
      this.handleColumnASelection(selectedWrestler);
    } else if (wrestlerIndex === 1) {
      this.handleColumnBSelection(selectedWrestler);
    }
  }

  private handleColumnASelection(selectedWrestler: Wrestler | undefined): void {
    this.wrestlerSelectedInColumnA = true;
    this.selectedWrestlers[0] = selectedWrestler || null;
    this.availableWrestlersForB = this.wrestlers.filter(
      (wrestler: Wrestler) => wrestler.id !== (selectedWrestler?.id || -1)
    );

    if (this.selectedWrestlers[1] !== null) {
      this.selectedWrestlers[1] = null;
    }
  }

  private handleColumnBSelection(selectedWrestler: Wrestler | undefined): void {
    if (this.wrestlerSelectedInColumnA) {
      if (
        selectedWrestler &&
        !this.selectedWrestlers.includes(selectedWrestler)
      ) {
        this.selectedWrestlers[1] = selectedWrestler;
      }
    }
  }

  public canSimulateMatch(): boolean {
    return (
      this.selectedWrestlers[0] !== null && this.selectedWrestlers[1] !== null
    );
  }

  public simulateMatch(): void {
    if (this.canSimulateMatch()) {
      const wrestlerA: Wrestler | null = this.selectedWrestlers[0];
      const wrestlerB: Wrestler | null = this.selectedWrestlers[1];

      if (wrestlerA && wrestlerB) {
        const numTurns: number = this.calculateNumTurns();
        const wrestlingMoves: {
          name: string;
          damage: number;
          accuracy: number;
        }[] = this.getWrestlingMoves();

        const simulateTurn = (wrestler: Wrestler, opponent: Wrestler): void => {
          const move =
            wrestlingMoves[Math.floor(Math.random() * wrestlingMoves.length)];
          const shouldPerformAdditionalMove: boolean = Math.random() < 0.3;
          if (shouldPerformAdditionalMove) {
            simulateTurn(wrestler, opponent);
          }
          const message = `${wrestler.name} performs ${move.name} on ${opponent.name}`;
          this.simulationMessages.push(message);
        };

        for (let i = 0; i < numTurns; i++) {
          simulateTurn(wrestlerA, wrestlerB);
          simulateTurn(wrestlerB, wrestlerA);
        }

        const winner: Wrestler = this.calculateWinner(wrestlerA, wrestlerB);
        const specialMove: string = this.getSpecialMove(winner);
        const winningMessage = `${winner.name} performs the special move ${specialMove} and wins the match!`;
        this.simulationMessages.push(winningMessage);
      }
    }
  }

  private calculateNumTurns(): number {
    const minTurns: number = 10;
    const maxTurns: number = 20;
    return Math.floor(Math.random() * (maxTurns - minTurns + 1)) + minTurns;
  }

  private getWrestlingMoves(): {
    name: string;
    damage: number;
    accuracy: number;
  }[] {
    return [
      { name: 'Punch', damage: 10, accuracy: 0.8 },
      { name: 'Kick', damage: 15, accuracy: 0.7 },
    ];
  }

  private calculateWinner(wrestlerA: Wrestler, wrestlerB: Wrestler): Wrestler {
    const seniorityFactor: number =
      1 +
      (wrestlerB.debut.getFullYear() - wrestlerA.debut.getFullYear()) * 0.05;
    const seniorityFactorSquared: number = seniorityFactor * seniorityFactor;
    const winningProbability: number =
      seniorityFactorSquared / (1 + seniorityFactorSquared);
    return Math.random() < winningProbability ? wrestlerA : wrestlerB;
  }

  private getSpecialMove(winner: Wrestler): string {
    return winner.specialMoves[
      Math.floor(Math.random() * winner.specialMoves.length)
    ];
  }
}
