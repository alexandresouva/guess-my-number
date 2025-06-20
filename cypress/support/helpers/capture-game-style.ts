import { ALIASES } from '../common/aliases';
import { SELECTORS } from '../common/selectors';

export function captureGameStyles(): void {
  cy.get(SELECTORS.SECRET_NUMBER)
    .invoke('outerWidth')
    .then((width) => cy.wrap(width).as(ALIASES.PREVIOUS_SECRET_NUMBER_WIDTH));

  cy.get(SELECTORS.GAME_CONTAINER)
    .invoke('css', 'background-color')
    .then((color) => cy.wrap(color).as(ALIASES.PREVIOUS_BACKGROUND_COLOR));
}
