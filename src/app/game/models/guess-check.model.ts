export type GuessCheckMessage =
  | '🎉 Correct number!'
  | '📈 Too high!'
  | '📉 Too low!';

export type GuessCheck = {
  number: number;
  correct: boolean;
  message: GuessCheckMessage;
};
