import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { ALIASES } from 'cypress/support/common/aliases';

import { SELECTORS } from 'cypress/support/common/selectors';
import { captureTextAndSaveAsAlias } from 'cypress/support/helpers/capture-and-wrap';

// Scenario: I exhaust all attempts without a correct guess
Given('I have used all 5 attempts without guessing correctly', () => {
  const attempts = 5;
  Cypress._.times(attempts, () => {
    cy.get(SELECTORS.GUESS_INPUT).clear().type('100');
    cy.get(SELECTORS.CHECK_BUTTON).click();
  });
  cy.get(SELECTORS.ATTEMPTS).should('have.text', '0');

  captureTextAndSaveAsAlias(SELECTORS.TIMER, ALIASES.FINAL_TIMER);
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
