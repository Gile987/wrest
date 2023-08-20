import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Wrestler } from '../../models/wrestler.model';
import { TjpwRosterService } from '../../services/tjpw-roster.service';
import { WrestlerModalComponent } from 'src/app/features/roster/components/wrestler-modal/wrestler-modal.component';

@Component({
  selector: 'app-wrestler-list',
  templateUrl: './wrestler-list.component.html',
  styleUrls: ['./wrestler-list.component.scss'],
})
export class WrestlerListComponent implements OnInit, OnDestroy {
  @Input() public wrestlers: Wrestler[] = [];
  @Output() public wrestlerSelected: EventEmitter<Wrestler> =
    new EventEmitter<Wrestler>();
  public currentPage: number = 1;
  public totalItems: number = 0;
  public isMobileView: boolean = false;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private rosterService: TjpwRosterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscribeToWrestlers();
    this.updatePageSize();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToWrestlers(): void {
    this.rosterService.wrestlers$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((wrestlers: Wrestler[]) => {
        this.totalItems = wrestlers.length;
        this.updateWrestlers(wrestlers);
      });
  }

  private updateWrestlers(wrestlers: Wrestler[]): void {
    const startIndex: number =
      (this.currentPage - 1) * this.getPageSizeForCurrentView();
    const endIndex: number = startIndex + this.getPageSizeForCurrentView();
    this.wrestlers = wrestlers.slice(startIndex, endIndex);
  }

  public openWrestlerModal(wrestler: Wrestler): void {
    this.dialog.open(WrestlerModalComponent, {
      data: wrestler,
      panelClass: 'wrestler-modal',
    });
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.subscribeToWrestlers();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event): void {
    this.updatePageSize();
    this.updateWrestlers(this.wrestlers);
  }

  public updatePageSize(): void {
    this.isMobileView = window.innerWidth < 799;
  }

  public getPageSizeForCurrentView(): number {
    return this.isMobileView ? 2 : 8;
  }
}
