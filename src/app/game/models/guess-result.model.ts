export type GuessFeedbackMessage =
  | 'Too high'
  | 'Too low'
  | 'Correct number'
  | 'Game over';

export type GuessResult = {
  correct: boolean;
  message: GuessFeedbackMessage;
};
