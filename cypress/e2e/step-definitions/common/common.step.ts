import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

import { ALIASES } from 'cypress/support/common/aliases';
import { SELECTORS } from 'cypress/support/common/selectors';
import { PAGES } from 'cypress/support/common/constants';
import { generateRandomSecretNumberAndStub } from 'cypress/support/helpers/prepare-secret-number';

Given('I am on the game page for guessing', () => {
  const { secretNumber, stubValue } = generateRandomSecretNumberAndStub();

  cy.wrap(secretNumber).as(ALIASES.SECRET_NUMBER);
  cy.visit(PAGES.GAME, {
    onBeforeLoad(win) {
      cy.stub(win.Math, 'random').returns(stubValue);
    }
  });
});

Given('I have at least 1 attempt remaining', () => {
  cy.get(SELECTORS.ATTEMPTS)
    .invoke('text')
    .then((text) => {
      const attempts = Number(text.trim());
      expect(attempts).to.be.greaterThan(0);
    });
});

Then('the timer stops immediately', () => {
  cy.getByAlias<string>('finalTimer').then((finalTimerValue) => {
    cy.wait(1500);
    cy.get(SELECTORS.TIMER).should('have.text', finalTimerValue);
  });
});
