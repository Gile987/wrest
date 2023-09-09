import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent implements OnInit, OnDestroy {
  shows: any[] = [];
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchShows();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  fetchShows(): void {
    this.http
      .get<any[]>('./assets/shows.json')
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data) => {
        this.shows = data;
      });
  }
}
