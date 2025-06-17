import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const mockSecretNumber = 7;
const mathRandomStubValue = (mockSecretNumber - 1) / 25;

Given('I am on the game page for guessing', () => {
  cy.wrap(mockSecretNumber).as('secretNumber');
  cy.visit('http://localhost:4200/game', {
    onBeforeLoad(win) {
      cy.stub(win.Math, 'random').returns(mathRandomStubValue);
    }
  });
});

When('I guess the correct number', function () {
  cy.get<number>('@secretNumber').then((secretNumber) => {
    cy.get('[data-testid="secret-number"]')
      .invoke('outerWidth')
      .then((width) => cy.wrap(width).as('initialWidth'));

    cy.get('[data-testid="guess-input"]').clear().type(String(secretNumber));
    cy.get('[data-testid="check-button"]').click();

    cy.get('[data-testid=timer]')
      .invoke('text')
      .then((timerText) => cy.wrap(timerText).as('finalTimerValue'));
  });
});

Then('the message "🎉 Correct number!" is displayed', () => {
  cy.get('[data-testid=game-message]')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('🎉 Correct number!');
    });
});

Then('the timer stops immediately', () => {
  cy.get<string>('@finalTimerValue').then((finalTimerValue) => {
    cy.wait(1500);
    cy.get('[data-testid=timer]').should('have.text', finalTimerValue);
  });
});

Then('the interface is updated to show the correct guess', () => {
  cy.get('[data-testid=game-container]').should(
    'have.css',
    'background-color',
    'rgb(96, 179, 71)'
  );

  cy.get<number>('@initialWidth').then((initialWidth) => {
    cy.get('[data-testid="secret-number"]')
      .invoke('outerWidth')
      .then((newWidth) => {
        expect(newWidth).to.be.greaterThan(initialWidth);
      });
  });
});

Then('the secret number is revealed', () => {
  cy.get<number>('@secretNumber').then((secretNumber) => {
    cy.get('[data-testid=secret-number]')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq(String(secretNumber));
      });
  });
});

Then('the final score is calculated and displayed', () => {
  cy.get('[data-testid=score]')
    .invoke('text')
    .then((score) => {
      const scoreNumber = Number(score);
      expect(scoreNumber).to.be.a('number').and.to.be.greaterThan(10);
    });
});
