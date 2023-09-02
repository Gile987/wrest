import { Component, OnInit } from '@angular/core';
import { TjpwRosterService } from '../../core/services/tjpw-roster.service';
import { Wrestler } from '../../core/models/wrestler.model';
import { WrestlingMovesService } from 'src/app/core/services/wrestling-moves.service';
import { WrestlingMove } from 'src/app/core/models/wrestling-moves.model';

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
  public winner: Wrestler | null = null;
  public wrestlingMoves: WrestlingMove[] = [];

  constructor(
    private rosterService: TjpwRosterService,
    private movesService: WrestlingMovesService
  ) {}

  ngOnInit(): void {
    this.subscribeToWrestlers();
    this.loadWrestlingMoves();
  }

  private loadWrestlingMoves(): void {
    this.movesService.getWrestlingMoves().subscribe((moves) => {
      this.wrestlingMoves = moves;
    });
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
    this.simulationMessages = [];
    if (this.canSimulateMatch()) {
      this.winner = null;
      const wrestlerA: Wrestler | null = this.selectedWrestlers[0];
      const wrestlerB: Wrestler | null = this.selectedWrestlers[1];

      if (wrestlerA && wrestlerB) {
        const numTurns: number = this.calculateNumTurns();
        const wrestlingMoves: {
          name: string;
        }[] = this.wrestlingMoves;

        const simulateTurn = (
          wrestler: Wrestler,
          opponent: Wrestler,
          index: number
        ): void => {
          if (index < numTurns) {
            const move =
              wrestlingMoves[Math.floor(Math.random() * wrestlingMoves.length)];
            const shouldPerformAdditionalMove: boolean = Math.random() < 0.3;

            const message: string = `${wrestler.name} performs ${move.name} on ${opponent.name}`;
            this.simulationMessages.push(message);

            if (shouldPerformAdditionalMove) {
              setTimeout(() => {
                simulateTurn(wrestler, opponent, index + 1);
              }, 500);
            } else {
              setTimeout(() => {
                simulateTurn(opponent, wrestler, index + 1);
              }, 500);
            }
          } else {
            const winner: Wrestler = this.calculateWinner(wrestlerA, wrestlerB);
            this.winner = winner;
            const specialMove: string = this.getSpecialMove(winner);
            const winningMessage: string = `${winner.name} performs the special move ${specialMove} and wins the match!`;
            this.simulationMessages.push(winningMessage);
          }
        };

        simulateTurn(wrestlerA, wrestlerB, 0);
      }
    }
  }

  private calculateNumTurns(): number {
    const minTurns: number = 10;
    const maxTurns: number = 20;
    return Math.floor(Math.random() * (maxTurns - minTurns + 1)) + minTurns;
  }

  private calculateWinner(wrestlerA: Wrestler, wrestlerB: Wrestler): Wrestler {
    const seniorityYears: number =
      wrestlerB.debut.getFullYear() - wrestlerA.debut.getFullYear();
    const seniorityFactor: number = 1 + seniorityYears * 0.05;
    let winningProbability: number;
    if (seniorityFactor > 1) {
      winningProbability = 0.9;
    } else {
      winningProbability = 0.6;
    }
    return Math.random() < winningProbability ? wrestlerA : wrestlerB;
  }

  private getSpecialMove(winner: Wrestler): string {
    return winner.specialMoves[
      Math.floor(Math.random() * winner.specialMoves.length)
    ];
  }
}
