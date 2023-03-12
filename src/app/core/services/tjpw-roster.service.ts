import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Wrestler } from '../models/wrestler.model';

@Injectable({
  providedIn: 'root'
})
export class TjpwRosterService {
  private wrestlersSubject: BehaviorSubject<Wrestler[]> = new BehaviorSubject<Wrestler[]>([]);
  readonly wrestlers$: Observable<Wrestler[]> = this.wrestlersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadWrestlers();
  }

  private loadWrestlers(): void {
    this.http.get<{wrestlers: Wrestler[]}>('./assets/wrestlers.json').pipe(
      catchError((err: unknown): Observable<never> => {
        console.error('Error loading wrestlers', err);
        return throwError('Unable to load wrestlers');
      }),
      map((data: {wrestlers: Wrestler[]}) => data.wrestlers.map(wrestlerData => ({
        ...wrestlerData,
        debut: new Date(wrestlerData.debut)
      }))),
    ).subscribe((wrestlers: Wrestler[]) => {
      this.wrestlersSubject.next(wrestlers);
    });
  }
  

  getWrestlerById(id: number): Observable<Wrestler | undefined> {
    return this.wrestlers$.pipe(
      map((wrestlers: Wrestler[]) => wrestlers.find(wrestler => wrestler.id === id))
    );
  }
}
