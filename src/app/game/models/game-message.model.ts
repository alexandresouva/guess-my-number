import { GuessFeedbackMessage } from './guess-result.model';

export type GameMessage =
  | 'Start guessing...'
  | '🤡 Choice a number'
  | GuessFeedbackMessage;
