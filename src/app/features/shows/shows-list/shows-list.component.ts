import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent implements OnInit {
  shows: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchShows();
  }

  fetchShows(): void {
    this.http.get<any[]>('./assets/shows.json').subscribe((data) => {
      this.shows = data;
    });
  }
}
