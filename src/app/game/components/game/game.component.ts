import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { GameMessage } from '@app/game/models/game-message.model';
import { GameService } from '@app/game/services/game.service';
import { TimerService } from '@app/game/services/timer.service';
import { RetroButtonComponent } from '../retro-button/retro-button.component';
import { FormsModule } from '@angular/forms';
import { GameAnnouncementType } from '@app/game/models/enums/game-announcement-type';

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

  protected readonly time = this._timerService.time;
  protected readonly attempts = this._gameService.attempts;
  protected readonly score = this._gameService.score;
  protected readonly highscore = this._gameService.highscore;
  protected readonly gameOver = this._gameService.gameOver;

  protected readonly guess = signal<string>('');
  protected readonly gameMessage = signal<GameMessage>('Start guessing...');
  protected readonly screenReaderAnnouncement = signal<string>('');
  protected readonly secretNumber = computed(() =>
    this.gameOver() ? this._gameService.secretNumber() : '?'
  );

  protected checkGuess(): void {
    if (!this.guess() || isNaN(Number(this.guess()))) {
      this.gameMessage.set('🤡 Choose a number');
      this._announceGameStateForScreenReaders(
        GameAnnouncementType.INVALID_INPUT
      );
      return;
    }

    const { message } = this._gameService.checkGuess(Number(this.guess()));
    this.gameMessage.set(message);
    this._announceGameStateForScreenReaders(GameAnnouncementType.NEW_GUESS);
  }

  protected restart(): void {
    this.guess.set('');
    this.gameMessage.set('Start guessing...');

    this._gameService.restart();
    this._announceGameStateForScreenReaders(GameAnnouncementType.RESTART);
  }

  private _announceGameStateForScreenReaders(type: GameAnnouncementType): void {
    const announcementsMap: Record<GameAnnouncementType, string> = {
      [GameAnnouncementType.RESTART]: 'Game restarted. Start guessing.',
      [GameAnnouncementType.INVALID_INPUT]: 'Choose a number.',
      [GameAnnouncementType.NEW_GUESS]: this._buildGameStatusAnnouncement()
    };

    const announcement = announcementsMap[type];
    this.screenReaderAnnouncement.set(announcement);
  }

  private _buildGameStatusAnnouncement(): string {
    const roundedTime = this.time().toFixed(2);
    const roundedScore = Math.round(this.score());

    const message = this.gameOver()
      ? `${this.gameMessage()} Score: ${roundedScore}. Time: ${roundedTime} seconds.`
      : `${this.gameMessage()} Attempts remaining: ${this.attempts()}.`;

    return message;
  }
}
