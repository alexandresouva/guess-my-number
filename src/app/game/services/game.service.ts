import { inject, Injectable, signal } from '@angular/core';
import { GuessResult } from '../models/guess-result';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly _timerService = inject(TimerService);

  private readonly _secretNumber = this._generateSecretNumber();
  private readonly _attempts = signal(5);
  private readonly _score = signal(0);

  attempts = this._attempts.asReadonly();
  score = this._score.asReadonly();

  checkGuess(guess: number): GuessResult {
    const isCorrectGuess = guess === this._secretNumber;
    if (isCorrectGuess) return this._processCorrectGuess(guess);

    return this._processIncorrectGuess(guess);
  }

  private _processCorrectGuess(guess: number): GuessResult {
    this._timerService.stop();
    this._score.set(this._calculateScore());

    return {
      number: guess,
      correct: true,
      message: '🎉 Correct number!'
    };
  }

  private _processIncorrectGuess(guess: number): GuessResult {
    this._timerService.start();
    this._decreaseAttempts();

    return {
      number: guess,
      correct: false,
      message: guess > this._secretNumber ? '📈 Too high!' : '📉 Too low!'
    };
  }

  private _generateSecretNumber(): number {
    return Math.floor(Math.random() * 25) + 1;
  }

  private _decreaseAttempts(): void {
    this._attempts.set(this._attempts() - 1);
  }

  private _calculateScore(): number {
    const minimumScore = 10;
    const score = this._attempts() * 15 - this._timerService.time();
    return score < minimumScore ? minimumScore : score;
  }
}
