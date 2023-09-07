import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchSettingsService {
  private minRounds: number = 10;
  private maxRounds: number = 20;

  public getMinRounds(): number {
    return this.minRounds;
  }

  public getMaxRounds(): number {
    return this.maxRounds;
  }

  public setMatchSettings(minRounds: number, maxRounds: number): void {
    this.minRounds = minRounds;
    this.maxRounds = maxRounds;
  }
}
