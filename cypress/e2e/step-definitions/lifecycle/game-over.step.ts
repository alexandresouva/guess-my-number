import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

import { SELECTORS } from 'cypress/support/common/selectors';

Given('I have used all 5 attempts without guessing correctly', () => {
  const attempts = 5;
  Cypress._.times(attempts, () => {
    cy.get(SELECTORS.GUESS_INPUT).clear().type('100');
    cy.get(SELECTORS.CHECK_BUTTON).click();
  });

  cy.get(SELECTORS.ATTEMPTS).should('have.text', '0');
});

Then('the message "🫤 Game over..." is displayed', () => {
  cy.get(SELECTORS.GAME_MESSAGE)
    .should('be.visible')
    .invoke('text')
    .should((text) => {
      expect(text.trim()).to.eq('🫤 Game over...');
    });
});

Then('my final score is zero', () => {
  cy.get(SELECTORS.SCORE).should('have.text', '0');
});

Then(`I can't make any more guesses`, () => {
  cy.get(SELECTORS.GUESS_INPUT).should('be.disabled');
  cy.get(SELECTORS.CHECK_BUTTON).should('be.disabled');
});
