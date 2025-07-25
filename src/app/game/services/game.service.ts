import { computed, inject, Injectable, signal } from '@angular/core';
import { GuessResult } from '../models/guess-result.model';
import { TimerService } from './timer.service';

const HIGHSCORE_KEY = 'guess-my-number-highscore';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly _timerService = inject(TimerService);

  private readonly _secretNumber = signal(this._generateSecretNumber());
  private readonly _attempts = signal(5);
  private readonly _score = signal(0);
  private readonly _highscore = signal(this._loadHighscore());

  readonly gameOver = computed(() => {
    return this._attempts() === 0 || this.score() > 0;
  });
  readonly secretNumber = this._secretNumber.asReadonly();
  readonly attempts = this._attempts.asReadonly();
  readonly score = this._score.asReadonly();
  readonly highscore = this._highscore.asReadonly();

  checkGuess(guess: number): GuessResult {
    const isCorrectGuess = guess === this._secretNumber();
    if (isCorrectGuess) return this._processCorrectGuess();

    return this._processIncorrectGuess(guess);
  }

  restart(): void {
    this._secretNumber.set(this._generateSecretNumber());
    this._attempts.set(5);
    this._score.set(0);
    this._timerService.reset();
  }

  private _processCorrectGuess(): GuessResult {
    this._timerService.stop();

    const score = this._calculateScore();
    this._score.set(score);
    this._updateHighscore(score);

    return {
      correct: true,
      message: 'Correct number'
    };
  }

  private _processIncorrectGuess(guess: number): GuessResult {
    this._timerService.start();
    this._decreaseAttempts();

    if (this.gameOver()) return this._processGameOver();

    return {
      correct: false,
      message: guess > this._secretNumber() ? 'Too high' : 'Too low'
    };
  }

  private _processGameOver(): GuessResult {
    this._timerService.stop();

    return {
      correct: false,
      message: 'Game over'
    };
  }

  private _generateSecretNumber(): number {
    return Math.floor(Math.random() * 25) + 1;
  }

  private _decreaseAttempts(): void {
    this._attempts.update((attempts) => attempts - 1);
  }

  private _calculateScore(): number {
    const minimumScore = 10;
    const score = this._attempts() * 15 - this._timerService.time();
    return score < minimumScore ? minimumScore : score;
  }

  private _updateHighscore(score: number): void {
    if (score <= this._highscore()) return;
    this._highscore.set(score);
    localStorage.setItem(HIGHSCORE_KEY, score.toString());
  }

  private _loadHighscore(): number {
    const stored = localStorage.getItem(HIGHSCORE_KEY);
    const parsed = stored ? Number(stored) : 0;
    return isNaN(parsed) ? 0 : parsed;
  }
}
