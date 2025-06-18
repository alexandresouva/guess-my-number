export type AliasValues = (typeof ALIASES)[keyof typeof ALIASES];

export const ALIASES = {
  SECRET_NUMBER: 'secretNumber',
  SECRET_NUMBER_INITIAL_WIDTH: 'secretNumberInitialWidth',
  FINAL_TIMER: 'finalTimer',
  INITIAL_BACKGROUND_COLOR: 'initialBackgroundColor'
} as const;
