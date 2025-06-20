import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

import { SELECTORS } from 'cypress/support/common/selectors';
import { captureGameStyles } from 'cypress/support/helpers/capture-game-style';

// Scenario: Restart the game even if I haven't made any guesses
Given(`I have not made any guesses`, () => {
  cy.get(SELECTORS.ATTEMPTS)
    .invoke('text')
    .should((text) => {
      expect(text.trim()).to.eq('5');
    });
});

// Scenario: Restart the game during a game
Given(`I have made at least 1 guess`, () => {
  cy.get(SELECTORS.GUESS_INPUT).clear().type('100');
  cy.get(SELECTORS.CHECK_BUTTON).click();

  cy.get(SELECTORS.ATTEMPTS)
    .invoke('text')
    .should((text) => {
      const attempts = Number(text.trim());
      expect(attempts).to.be.gte(1);
    });
});

// Scenario: Restart the game after a win
Given(`I have made the correct guess`, () => {
  cy.getByAlias<number>('secretNumber').then((secretNumber) => {
    cy.get(SELECTORS.GUESS_INPUT).clear().type(String(secretNumber));
    cy.get(SELECTORS.CHECK_BUTTON).click();
  });

  captureGameStyles();
});

Then('the highscore should not be cleaned', () => {
  cy.get(SELECTORS.HIGHSCORE)
    .invoke('text')
    .should((text) => {
      const highscore = Number(text.trim());
      expect(highscore).to.be.gte(10);
    });
});

Then('the game styles should be updated', () => {
  cy.get(SELECTORS.GAME_CONTAINER)
    .invoke('css', 'background-color')
    .then((currentColor) => {
      cy.getByAlias<string>('previousBackgroundColor').then((previousWidth) => {
        expect(currentColor).not.to.eq(previousWidth);
      });
    });

  cy.get(SELECTORS.SECRET_NUMBER)
    .invoke('outerWidth')
    .then((newWidth) => {
      cy.getByAlias<number>('previousSecretNumberWidth').then(
        (previousWidth) => {
          expect(newWidth).to.be.not.gte(previousWidth);
        }
      );
    });
});

// Scenario: Restart the game after a loss
Given(`I have made all 5 incorrect guesses`, () => {
  const attempts = 5;
  Cypress._.times(attempts, () => {
    cy.get(SELECTORS.GUESS_INPUT).clear().type('100');
    cy.get(SELECTORS.CHECK_BUTTON).click();
  });

  cy.get(SELECTORS.ATTEMPTS).should('have.text', '0');
});
