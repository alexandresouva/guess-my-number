import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '@app/game/services/game.service';
import { TimerService } from '@app/game/services/timer.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  private readonly _gameService = inject(GameService);
  private readonly _timerService = inject(TimerService);

  protected readonly secretNumber = signal<number | '?'>('?');
  protected readonly gameMessage = signal<string>('Start guessing...');
  protected readonly attempts = this._gameService.attempts;
  protected readonly score = this._gameService.score;
  protected readonly time = toSignal(this._timerService.time$, {
    initialValue: 0
  });

  protected checkGuess(guess: string): void {
    if (!guess || isNaN(Number(guess))) {
      return this.gameMessage.set('🤡 Choice a number');
    }

    const { correct, message } = this._gameService.checkGuess(Number(guess));
    if (correct) this.secretNumber.set(Number(guess));
    this.gameMessage.set(message);
  }
}
