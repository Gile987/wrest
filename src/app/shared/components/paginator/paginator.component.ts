import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() public currentPage!: number;
  @Input() public pageSize!: number;
  @Input() public totalItems!: number;
  @Output() public pageChange: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public getPages(): number[] {
    const totalPages: number = this.getTotalPages();
    return Array(totalPages)
      .fill(0)
      .map((_, index: number): number => index + 1);
  }

  public goToPage(event: MouseEvent, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.getTotalPages()) {
      this.pageChange.emit(page);
    }
  }

  public getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
