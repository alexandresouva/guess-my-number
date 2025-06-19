import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { GameMessage } from '@app/game/models/game-message.model';
import { GameService } from '@app/game/services/game.service';
import { TimerService } from '@app/game/services/timer.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  host: {
    '[class.correct-game]': 'secretNumber() !== "?"',
    '[attr.data-testid]': '"game-container"'
  }
})
export class GameComponent {
  private readonly _gameService = inject(GameService);
  private readonly _timerService = inject(TimerService);

  protected readonly secretNumber = signal<number | '?'>('?');
  protected readonly gameMessage = signal<GameMessage>('Start guessing...');
  protected readonly attempts = this._gameService.attempts;
  protected readonly score = this._gameService.score;
  protected readonly time = this._timerService.time;

  protected checkGuess(guess: string): void {
    if (!guess || isNaN(Number(guess))) {
      return this.gameMessage.set('🤡 Choice a number');
    }

    const { correct, message } = this._gameService.checkGuess(Number(guess));
    if (correct) {
      this.secretNumber.set(Number(guess));
    }
    this.gameMessage.set(message);
  }
}
