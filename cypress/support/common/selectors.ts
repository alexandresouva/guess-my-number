export type DataTestId = (typeof SELECTORS)[keyof typeof SELECTORS];

export const SELECTORS = {
  GAME_CONTAINER: '[data-testid="game-container"]',
  SECRET_NUMBER: '[data-testid="secret-number"]',
  GUESS_INPUT: '[data-testid="guess-input"]',
  CHECK_BUTTON: '[data-testid="check-button"]',
  GAME_MESSAGE: '[data-testid="game-message"]',
  ATTEMPTS: '[data-testid="attempts-available"]',
  SCORE: '[data-testid="score"]',
  HIGHSCORE: '[data-testid="highscore"]',
  TIMER: '[data-testid="timer"]'
} as const;
