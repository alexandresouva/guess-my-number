import { inject, Injectable, signal } from '@angular/core';
import { GuessCheck } from '../models/guess-check.model';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly _timerService = inject(TimerService);

  private readonly _attempts = signal(5);
  attempts = this._attempts.asReadonly();

  checkGuess(number: number): GuessCheck {
    throw new Error(`Method not implemented. Number: ${number}`);
  }

  private _generateSecretNumber(): number {
    throw new Error('Method not implemented.');
  }

  private _processCorrectGuess(): void {
    throw new Error('Method not implemented.');
  }

  private _calculateScore(): number {
    throw new Error('Method not implemented.');
  }
}
