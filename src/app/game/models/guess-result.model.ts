export type GuessFeedbackMessage =
  | '🎉 Correct number!'
  | '📈 Too high!'
  | '📉 Too low!';

export type GuessResult = {
  number: number;
  correct: boolean;
  message: GuessFeedbackMessage;
};
