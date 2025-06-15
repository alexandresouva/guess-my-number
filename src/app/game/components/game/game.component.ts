import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { GameService } from '@app/game/services/game.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  private readonly _gameService = inject(GameService);

  protected readonly secretNumber = signal<number | '?'>('?');
  protected readonly gameMessage = signal<string>('Start guessing...');

  protected checkGuess(guess: string): void {
    throw new Error(`Method not implemented. Guess: ${guess}`);
  }
}
