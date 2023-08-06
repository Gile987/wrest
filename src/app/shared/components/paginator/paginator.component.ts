import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() totalItems!: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  getPages(): number[] {
    const totalPages: number = this.getTotalPages();
    return Array(totalPages).fill(0).map((_, index: number): number => index + 1);
  }

  goToPage(event: MouseEvent, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.getTotalPages()) {
      this.pageChange.emit(page);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
