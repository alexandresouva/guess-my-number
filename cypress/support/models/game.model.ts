import { GamePage } from '../pages/game';

export interface GameWorld extends Mocha.Context {
  gamePage: GamePage;
}

export interface GameState {
  secretNumber: string;
  score: number;
  highscore?: number;
  timer: string;
  attempts: number;
  message: string;
}
