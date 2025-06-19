export type AliasValues = (typeof ALIASES)[keyof typeof ALIASES];

export const ALIASES = {
  INITIAL_BACKGROUND_COLOR: 'initialBackgroundColor',
  SECRET_NUMBER: 'secretNumber',
  SECRET_NUMBER_INITIAL_WIDTH: 'secretNumberInitialWidth',
  PREVIOUS_HIGHSCORE: 'previousHighscore',
  FINAL_SCORE: 'finalScore',
  FINAL_TIMER: 'finalTimer'
} as const;
