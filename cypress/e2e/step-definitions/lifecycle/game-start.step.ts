import { Then } from '@badeball/cypress-cucumber-preprocessor';

import { SELECTORS } from 'cypress/support/common/selectors';

Then('I have 5 attempts available', () => {
  cy.get(SELECTORS.ATTEMPTS).should('be.visible').and('have.text', '5');
});

Then('the message displayed is "Start guessing..."', () => {
  cy.get(SELECTORS.GAME_MESSAGE)
    .should('be.visible')
    .invoke('text')
    .should((text) => {
      expect(text.trim()).to.eq('Start guessing...');
    });
});

Then('the game is in its initial state', () => {
  cy.get(SELECTORS.SECRET_NUMBER)
    .invoke('text')
    .should((text) => {
      expect(text.trim()).to.eq('?');
    });

  cy.get(SELECTORS.SCORE)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('0');
    });

  cy.get(SELECTORS.HIGHSCORE)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('0');
    });

  cy.get(SELECTORS.TIMER)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('0.00');
    });
});
