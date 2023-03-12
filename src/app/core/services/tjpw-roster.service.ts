import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Wrestler } from '../models/wrestler.model';

@Injectable({
  providedIn: 'root'
})
export class TjpwRosterService {
  private wrestlersSubject = new BehaviorSubject<Wrestler[]>([]);
  wrestlers$ = this.wrestlersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadWrestlers();
  }

  private loadWrestlers(): void {
    this.http.get<{wrestlers: Wrestler[]}>("./assets/wrestlers.json").pipe(
      catchError(err => {
        console.error('Error loading wrestlers', err);
        return throwError('Unable to load wrestlers');
      }),
      tap(data => console.log("data before map: ", data)),
      map(data => data.wrestlers.map(wrestlerData => ({...wrestlerData, debut: new Date(wrestlerData.debut)}))),
      tap(wrestlers => console.log("data after map: ", wrestlers))
    ).subscribe(wrestlers => {
      console.log("data in subscribe ", wrestlers);
      this.wrestlersSubject.next(wrestlers);
    });
  }

  getWrestlerById(id: number): Observable<Wrestler | undefined> {
    return this.wrestlers$.pipe(
      map(wrestlers => wrestlers.find(wrestler => wrestler.id === id))
    );
  }
}
