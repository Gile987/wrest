import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Wrestler } from '../../models/wrestler.model';
import { TjpwRosterService } from '../../services/tjpw-roster.service';

@Component({
  selector: 'app-wrestler-list',
  templateUrl: './wrestler-list.component.html',
  styleUrls: ['./wrestler-list.component.scss']
})
export class WrestlerListComponent implements OnInit, OnDestroy {
  wrestlers: Wrestler[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private rosterService: TjpwRosterService) {}

  ngOnInit(): void {
    this.subscribeToWrestlers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToWrestlers(): void {
    this.rosterService.wrestlers$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(wrestlers => {
        this.wrestlers = wrestlers;
      });
  }
}
