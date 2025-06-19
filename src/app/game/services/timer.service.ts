import { Injectable, signal } from '@angular/core';

import { finalize, interval, map, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private readonly stop$ = new Subject<void>();
  private readonly reset$ = new Subject<void>();
  private _playing = false;

  private readonly _time = signal(0);
  time = this._time.asReadonly();

  start(): void {
    if (this._playing) return;

    this._playing = true;
    const startTimestamp = Date.now();
    interval(100)
      .pipe(
        map(() => (Date.now() - startTimestamp) / 1000), // Convert to seconds
        takeUntil(this.stop$),
        takeUntil(this.reset$),
        finalize(() => (this._playing = false))
      )
      .subscribe((elapsed) => {
        this._time.set(elapsed);
      });
  }

  stop(): void {
    this.stop$.next();
  }

  reset(): void {
    this.reset$.next();
    this._time.set(0);
  }
}
