import { environment } from 'src/environments/environment';
import { GameState } from '../models/game.model';

export const PAGES = {
  HOME: `${environment.baseUrl}/`,
  GAME: `${environment.baseUrl}/game`
} as const;

export const DEFAULT_GAME_STATE: GameState = {
  attempts: 5,
  score: 0,
  highscore: 0,
  secretNumber: '?',
  timer: '0.00',
  message: 'Start guessing...'
};
