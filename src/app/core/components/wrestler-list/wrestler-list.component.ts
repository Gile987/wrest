import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Wrestler } from '../../models/wrestler.model';
import { TjpwRosterService } from '../../services/tjpw-roster.service';
import { MatDialog } from '@angular/material/dialog';
import { WrestlerModalComponent } from 'src/app/features/roster/components/wrestler-modal/wrestler-modal.component';

@Component({
  selector: 'app-wrestler-list',
  templateUrl: './wrestler-list.component.html',
  styleUrls: ['./wrestler-list.component.scss']
})
export class WrestlerListComponent implements OnInit, OnDestroy {
  @Input() wrestlers: Wrestler[] = [];
  @Output() wrestlerSelected = new EventEmitter<Wrestler>();
  currentPage: number = 1;
  pageSize: number = 4;
  totalItems: number = 0;
  
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private rosterService: TjpwRosterService, private dialog: MatDialog) {}

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
        this.totalItems = wrestlers.length;
        this.updateWrestlers(wrestlers);
      });
  }
  
  private updateWrestlers(wrestlers: Wrestler[]): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.wrestlers = wrestlers.slice(startIndex, endIndex);
  }  

  openWrestlerModal(wrestler: Wrestler) {
    this.dialog.open(WrestlerModalComponent, {
      data: wrestler
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.subscribeToWrestlers();
  }

}
