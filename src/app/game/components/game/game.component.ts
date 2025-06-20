import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { GameMessage } from '@app/game/models/game-message.model';
import { GameService } from '@app/game/services/game.service';
import { TimerService } from '@app/game/services/timer.service';
import { RetroButtonComponent } from '../retro-button/retro-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  imports: [CommonModule, RetroButtonComponent, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  host: {
    '[class.correct-game]': 'score() > 0',
    '[attr.data-testid]': '"game-container"'
  }
})
export class GameComponent {
  private readonly _gameService = inject(GameService);
  private readonly _timerService = inject(TimerService);

  protected readonly guess = signal<string>('');
  protected readonly secretNumber = computed(() =>
    this.gameOver() ? this._gameService.secretNumber() : '?'
  );
  protected readonly gameMessage = signal<GameMessage>('Start guessing...');

  protected readonly time = this._timerService.time;
  protected readonly attempts = this._gameService.attempts;
  protected readonly score = this._gameService.score;
  protected readonly highscore = this._gameService.highscore;
  protected readonly gameOver = this._gameService.gameOver;

  protected checkGuess(): void {
    if (!this.guess() || isNaN(Number(this.guess()))) {
      return this.gameMessage.set('🤡 Choice a number');
    }

    const { message } = this._gameService.checkGuess(Number(this.guess()));
    this.gameMessage.set(message);
  }

  protected restart(): void {
    this.gameMessage.set('Start guessing...');
    this.guess.set('');

    this._gameService.restart();
  }
}
