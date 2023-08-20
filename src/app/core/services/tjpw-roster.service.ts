import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { Wrestler } from '../models/wrestler.model';

@Injectable({
  providedIn: 'root',
})
export class TjpwRosterService {
  private wrestlersSubject: BehaviorSubject<Wrestler[]> = new BehaviorSubject<
    Wrestler[]
  >([]);
  readonly wrestlers$: Observable<Wrestler[]> =
    this.wrestlersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadWrestlers();
  }

  private loadWrestlers(): void {
    this.http
      .get<{ wrestlers: Wrestler[] }>('./assets/wrestlers.json')
      .pipe(
        catchError((err: any): Observable<never> => {
          console.error('Error loading wrestlers', err);
          throw new Error('Unable to load wrestlers');
        }),
        map((data: { wrestlers: Wrestler[] }) =>
          data.wrestlers.map((wrestlerData: Wrestler) => ({
            ...wrestlerData,
            debut: new Date(wrestlerData.debut),
          }))
        )
      )
      .subscribe((wrestlers: Wrestler[]) => {
        this.wrestlersSubject.next(wrestlers);
      });
  }

  public getWrestlerById(id: number): Observable<Wrestler | undefined> {
    return this.wrestlers$.pipe(
      map((wrestlers: Wrestler[]) =>
        wrestlers.find((wrestler) => wrestler.id === id)
      )
    );
  }
}
