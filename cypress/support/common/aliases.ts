export type GameAlias = (typeof ALIASES)[keyof typeof ALIASES];

export const ALIASES = {
  // Styles
  PREVIOUS_BACKGROUND_COLOR: 'previousBackgroundColor',
  PREVIOUS_SECRET_NUMBER_WIDTH: 'previousSecretNumberWidth',

  // Score
  FINAL_SCORE: 'finalScore',
  PREVIOUS_HIGHSCORE: 'previousHighscore',

  // Timer
  PREVIOUS_TIMER: 'previousTimer',
  FINAL_TIMER: 'finalTimer',

  // Guess
  SECRET_NUMBER: 'secretNumber',
  PREVIOUS_ATTEMPTS: 'previousAttempts'
} as const;
