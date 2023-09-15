import { Component, OnInit, ViewChild } from '@angular/core';
import { TjpwRosterService } from '../../core/services/tjpw-roster.service';
import { Wrestler } from '../../core/models/wrestler.model';
import { WrestlingMovesService } from 'src/app/core/services/wrestling-moves.service';
import { WrestlingMove } from 'src/app/core/models/wrestling-moves.model';
import { MatSelect } from '@angular/material/select';
import { MatchSettingsComponent } from './match-settings/match-settings.component';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WinnerModalComponent } from './winner-modal/winner-modal.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  @ViewChild('wrestlerASelect', { static: false }) wrestlerASelect:
    | MatSelect
    | undefined;
  @ViewChild('wrestlerBSelect', { static: false }) wrestlerBSelect:
    | MatSelect
    | undefined;
  @ViewChild(MatchSettingsComponent, { static: false }) matchSettingsComponent:
    | MatchSettingsComponent
    | undefined;
  public wrestlers: Wrestler[] = [];
  public availableWrestlersForB: Wrestler[] = [];
  public selectedWrestlers: (Wrestler | null)[] = [null, null];
  public wrestlerSelectedInColumnA: boolean = false;
  public simulationMessages: string[] = [];
  public winner: Wrestler | null = null;
  public loser: Wrestler | null = null;
  public wrestlingMoves: WrestlingMove[] = [];
  public matchStarted: boolean = false;
  public wrestlerAHealth: number = 100;
  public wrestlerBHealth: number = 100;
  public wrestlerAHealthBarClass: string = 'high-health';
  public wrestlerBHealthBarClass: string = 'high-health';
  private minRounds!: number;
  private maxRounds!: number;
  private componentDestroyed$ = new Subject<void>();

  constructor(
    private rosterService: TjpwRosterService,
    private movesService: WrestlingMovesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscribeToWrestlers();
    this.loadWrestlingMoves();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  private loadWrestlingMoves(): void {
    this.movesService
      .getWrestlingMoves()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((moves) => {
        this.wrestlingMoves = moves;
      });
  }

  private subscribeToWrestlers(): void {
    this.rosterService.wrestlers$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((wrestlers: Wrestler[]) => {
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
      this.loser = null;
      this.matchStarted = true;
      this.wrestlerAHealth = 100;
      this.wrestlerBHealth = 100;
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
            this.simulateSingleTurn(wrestler, opponent);
            const shouldPerformAdditionalMove: boolean = Math.random() < 0.3;

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
            this.loser = winner === wrestlerA ? wrestlerB : wrestlerA;
            const specialMove: string = this.getSpecialMove(winner);
            const winningMessage: string = `${winner.name} performs the special move ${specialMove} and wins the match!`;
            this.simulationMessages.push(winningMessage);
            this.openWinnerModal(winner);
          }
        };

        simulateTurn(wrestlerA, wrestlerB, 0);
      }
    }
  }

  openWinnerModal(winner: any) {
    console.log('winner', winner);
    this.dialog.open(WinnerModalComponent, {
      data: { winner: winner },
    });
  }

  private simulateSingleTurn(wrestler: Wrestler, opponent: Wrestler): void {
    const move: WrestlingMove =
      this.wrestlingMoves[
        Math.floor(Math.random() * this.wrestlingMoves.length)
      ];
    const message: string = `${wrestler.name} performs ${move.name} on ${opponent.name}`;
    this.simulationMessages.push(message);

    if (opponent === this.selectedWrestlers[0]) {
      this.wrestlerAHealth -= 10;
      this.wrestlerAHealthBarClass = this.getHealthBarColorClass(
        this.wrestlerAHealth
      );
    } else {
      this.wrestlerBHealth -= 10;
      this.wrestlerBHealthBarClass = this.getHealthBarColorClass(
        this.wrestlerBHealth
      );
    }
  }

  private calculateNumTurns(): number {
    return (
      Math.floor(Math.random() * (this.maxRounds - this.minRounds + 1)) +
      this.minRounds
    );
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

  private resetSelections(): void {
    this.selectedWrestlers = [null, null];
    this.wrestlerSelectedInColumnA = false;
    this.availableWrestlersForB = [...this.wrestlers];

    if (this.wrestlerASelect) {
      this.wrestlerASelect.writeValue(null);
    }
    if (this.wrestlerBSelect) {
      this.wrestlerBSelect.writeValue(null);
    }
  }

  public handleSettingsSaved(settings: {
    minRounds: number;
    maxRounds: number;
  }): void {
    this.minRounds = settings.minRounds;
    this.maxRounds = settings.maxRounds;
  }

  public clearMessages(): void {
    this.simulationMessages = [];
    this.matchStarted = false;
    this.winner = null;
    this.resetSelections();
    this.wrestlerAHealth = 100;
    this.wrestlerBHealth = 100;
  }

  public getHealthBarColorClass(health: number): string {
    if (health <= 30) {
      return 'low-health';
    } else if (health > 30 && health <= 70) {
      return 'medium-health';
    } else {
      return 'high-health';
    }
  }
}
