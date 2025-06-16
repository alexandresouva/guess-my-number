import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { GuessCheck } from '../models/guess-check.model';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly _timerService = inject(TimerService);

  private readonly _attempts = signal(5);
  attempts = this._attempts.asReadonly();
  private readonly _score = signal(0);
  score = this._score.asReadonly();

  private readonly _secretNumber = this._generateSecretNumber();
  private readonly _playing = signal(false);

  constructor() {
    effect(() => {
      const playing = this._playing();

      untracked(() => {
        if (playing) return this._timerService.start();
      });
    });
  }

  checkGuess(number: number): GuessCheck {
    if (number === this._secretNumber) {
      this._processCorrectGuess();
      return {
        number,
        correct: true,
        message: '🎉 Correct number!'
      };
    }

    this._playing.set(true);
    this._decreaseAttempts();
    return {
      number,
      correct: false,
      message: number < this._secretNumber ? '📉 Too low!' : '📈 Too high!'
    };
  }

  private _generateSecretNumber(): number {
    const secretNumber = Math.floor(Math.random() * 25) + 1;
    return secretNumber;
  }

  private _decreaseAttempts(): void {
    this._attempts.set(this._attempts() - 1);
  }

  private _processCorrectGuess(): void {
    this._timerService.stop();
    this._score.set(this._calculateScore());
  }

  private _calculateScore(): number {
    const minimumScore = 10;
    const score = this._attempts() * 15 - this._timerService.time;
    return score < minimumScore ? minimumScore : score;
  }
}
