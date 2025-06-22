import { GuessFeedbackMessage } from './guess-result.model';

export type GameMessage =
  | 'Start guessing...'
  | '🤡 Choose a number'
  | GuessFeedbackMessage;
