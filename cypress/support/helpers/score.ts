import { ALIASES } from '../common/aliases';
import { SELECTORS } from '../common/selectors';

export function captureHighscore(): void {
  cy.get(SELECTORS.HIGHSCORE)
    .invoke('text')
    .then((text) => {
      cy.wrap(Number(text.trim())).as(ALIASES.PREVIOUS_HIGHSCORE);
    });
}

export function captureFinalScore(): void {
  cy.get(SELECTORS.SCORE)
    .invoke('text')
    .then((text) => {
      cy.wrap(Number(text.trim())).as(ALIASES.FINAL_SCORE);
    });
}
