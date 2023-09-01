import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WrestlingMovesService {
  private movesUrl = 'assets/wrestling-moves.json';

  constructor(private http: HttpClient) {}

  public getWrestlingMoves(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(this.movesUrl);
  }
}
