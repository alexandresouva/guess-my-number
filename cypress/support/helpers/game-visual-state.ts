import { ALIASES } from '../common/aliases';
import { SELECTORS } from '../common/selectors';

export function captureInitialGameVisualState(): void {
  cy.get(SELECTORS.SECRET_NUMBER)
    .invoke('outerWidth')
    .then((width) => cy.wrap(width).as(ALIASES.SECRET_NUMBER_INITIAL_WIDTH));

  cy.get(SELECTORS.GAME_CONTAINER)
    .invoke('css', 'background-color')
    .then((color) => cy.wrap(color).as(ALIASES.INITIAL_BACKGROUND_COLOR));
}

export function capturePostGuessVisualState(): void {
  cy.get(SELECTORS.TIMER)
    .invoke('text')
    .then((timerText) => cy.wrap(timerText).as(ALIASES.FINAL_TIMER));
}
