export type GuessFeedbackMessage =
  | '📈 Too high!'
  | '📉 Too low!'
  | '🎉 Correct number!'
  | '🫤 Game over...';

export type GuessResult = {
  number: number;
  correct: boolean;
  message: GuessFeedbackMessage;
};
