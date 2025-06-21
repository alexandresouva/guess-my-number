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
      expect(attempts).to.be.gte(1);
    });
});

Given('I have at least 2 attempts remaining', () => {
  cy.get(SELECTORS.ATTEMPTS)
    .invoke('text')
    .then((text) => {
      const attempts = Number(text.trim());
      expect(attempts).to.be.gte(2);
    });
});

Given(`I click the "Restart" button`, () => {
  cy.get(SELECTORS.RESTART_BUTTON).click();
});

Then('my remaining attempts decrease by 1', () => {
  cy.get(SELECTORS.ATTEMPTS)
    .invoke('text')
    .then((text) => {
      const attempts = Number(text.trim());
      cy.getByAlias<number>('previousAttempts').then((previousAttempts) => {
        expect(attempts).to.eq(previousAttempts - 1);
      });
    });
});

Then('the timer keeps running', () => {
  cy.wait(1500);

  cy.get(SELECTORS.TIMER)
    .invoke('text')
    .then((text) => {
      const currentTimerValue = Number(text.trim());
      cy.getByAlias<string>('previousTimer').then((previousTimerValue) => {
        expect(currentTimerValue).to.be.gt(Number(previousTimerValue));
      });
    });
});

Then('the timer stops immediately', () => {
  cy.get(SELECTORS.TIMER)
    .invoke('text')
    .then((text) => {
      cy.getByAlias<string>('finalTimer').then((finalTimer) => {
        expect(text.trim()).to.eq(finalTimer);
      });
    });
});

Then('the secret number is revealed', () => {
  cy.get(SELECTORS.SECRET_NUMBER)
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      cy.getByAlias<number>('secretNumber').then((secretNumber) => {
        expect(text.trim()).to.eq(String(secretNumber));
      });
    });
});

Then('the game resets', () => {
  cy.get(SELECTORS.SECRET_NUMBER)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('?');
    });
  cy.get(SELECTORS.ATTEMPTS)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('5');
    });
  cy.get(SELECTORS.TIMER)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('0.00');
    });
  cy.get(SELECTORS.SCORE)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('0');
    });
  cy.get(SELECTORS.GAME_MESSAGE)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('Start guessing...');
    });
});
