import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { ALIASES } from 'cypress/support/common/aliases';
import { SELECTORS } from 'cypress/support/common/selectors';
import { captureTextAndSaveAsAlias } from 'cypress/support/helpers/capture-and-wrap';

// Scenario: I make a guess that is too high
When('I input a guess higher than the secret number', () => {
  captureTextAndSaveAsAlias(SELECTORS.ATTEMPTS, ALIASES.PREVIOUS_ATTEMPTS);

  cy.getByAlias<number>('secretNumber').then((secretNumber) => {
    cy.get(SELECTORS.GUESS_INPUT)
      .clear()
      .type(String(secretNumber + 1));
    cy.get(SELECTORS.CHECK_BUTTON).click();
  });

  captureTextAndSaveAsAlias(SELECTORS.TIMER, ALIASES.PREVIOUS_TIMER);
});

Then('the message "📈 Too high!" is displayed', () => {
  cy.get(SELECTORS.GAME_MESSAGE)
    .should('be.visible')
    .invoke('text')
    .should((text) => {
      expect(text.trim()).to.eq('📈 Too high!');
    });
});

// Scenario: I make a guess that is too low
When('I input a guess lower than the secret number', () => {
  captureTextAndSaveAsAlias(SELECTORS.ATTEMPTS, ALIASES.PREVIOUS_ATTEMPTS);

  cy.getByAlias<number>('secretNumber').then((secretNumber) => {
    cy.get(SELECTORS.GUESS_INPUT)
      .clear()
      .type(String(secretNumber - 1));
    cy.get(SELECTORS.CHECK_BUTTON).click();
  });

  captureTextAndSaveAsAlias(SELECTORS.TIMER, ALIASES.PREVIOUS_TIMER);
});

Then('the message "📉 Too low!" is displayed', () => {
  cy.get(SELECTORS.GAME_MESSAGE)
    .should('be.visible')
    .invoke('text')
    .should((text) => {
      expect(text.trim()).to.eq('📉 Too low!');
    });
});
