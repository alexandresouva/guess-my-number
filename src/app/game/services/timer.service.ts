import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private readonly _timeSubject = new BehaviorSubject(0);
  time$ = this._timeSubject.asObservable();

  get timeMs(): number {
    throw new Error('Method not implemented.');
  }

  start(): void {
    throw new Error('Method not implemented.');
  }

  stop(): void {
    throw new Error('Method not implemented.');
  }

  reset(): void {
    throw new Error('Method not implemented.');
  }
}
