import { Injectable } from '@angular/core';

import { BehaviorSubject, interval, map, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private readonly stop$ = new Subject<void>();
  private readonly reset$ = new Subject<void>();
  private readonly _timeSubject = new BehaviorSubject(0);
  time$ = this._timeSubject.asObservable();

  get time(): number {
    return this._timeSubject.value;
  }

  start(): void {
    const startTimestamp = Date.now();

    interval(100)
      .pipe(
        map(() => (Date.now() - startTimestamp) / 1000),
        takeUntil(this.stop$),
        takeUntil(this.reset$)
      )
      .subscribe((elapsed) => {
        this._timeSubject.next(elapsed);
      });
  }

  stop(): void {
    this.stop$.next();
  }

  reset(): void {
    this.reset$.next();
    this._timeSubject.next(0);
  }
}
