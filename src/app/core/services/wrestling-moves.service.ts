import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrestlingMove } from '../models/wrestling-moves.model';

@Injectable({
  providedIn: 'root',
})
export class WrestlingMovesService {
  private movesUrl = 'assets/wrestling-moves.json';

  constructor(private http: HttpClient) {}

  public getWrestlingMoves(): Observable<WrestlingMove[]> {
    return this.http.get<{ name: string }[]>(this.movesUrl);
  }
}
