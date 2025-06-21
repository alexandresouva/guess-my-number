import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { ALIASES } from 'cypress/support/common/aliases';
import { SELECTORS } from 'cypress/support/common/selectors';
import { captureTextAndSaveAsAlias } from 'cypress/support/helpers/capture-and-wrap';
import { captureGameStyles } from 'cypress/support/helpers/capture-game-style';

When('I guess the correct number', function () {
  captureGameStyles();
  captureTextAndSaveAsAlias(SELECTORS.HIGHSCORE, ALIASES.PREVIOUS_HIGHSCORE);

  cy.getByAlias<number>('secretNumber').then((secretNumber) => {
    cy.get(SELECTORS.GUESS_INPUT).clear().type(String(secretNumber));
    cy.get(SELECTORS.CHECK_BUTTON).click();
  });

  captureTextAndSaveAsAlias(SELECTORS.TIMER, ALIASES.FINAL_TIMER);
});

Then('the message "🎉 Correct number!" is displayed', () => {
  cy.get(SELECTORS.GAME_MESSAGE)
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.eq('🎉 Correct number!');
    });
});

Then('the interface updates to show the correct number', () => {
  cy.get(SELECTORS.GAME_CONTAINER)
    .invoke('css', 'background-color')
    .then((currentColor) => {
      cy.getByAlias<string>('previousBackgroundColor').then((previousColor) => {
        expect(currentColor).not.to.eq(previousColor);
      });
    });

  cy.get(SELECTORS.SECRET_NUMBER)
    .invoke('outerWidth')
    .then((newWidth) => {
      cy.getByAlias<number>('previousSecretNumberWidth').then(
        (previousWidth) => {
          expect(newWidth).to.be.greaterThan(previousWidth);
        }
      );
    });
});

Then('the final score is displayed', () => {
  cy.get(SELECTORS.SCORE)
    .should('be.visible')
    .invoke('text')
    .then((score) => {
      const scoreNumber = Number(score);
      expect(scoreNumber).to.be.a('number').and.to.be.greaterThan(10);
    });
});

Then('the high score is updated if necessary', () => {
  captureTextAndSaveAsAlias(SELECTORS.SCORE, ALIASES.FINAL_SCORE);

  cy.getByAlias<number>('finalScore').then((finalScore) => {
    cy.getByAlias<number>('previousHighscore').then((previousHighscore) => {
      cy.get(SELECTORS.HIGHSCORE)
        .should('be.visible')
        .invoke('text')
        .then((highscoreText) => {
          const highscore = Number(highscoreText.trim());
          expect(highscore).to.be.a('number');

          const expectedHighscore = Math.max(finalScore, previousHighscore);
          expect(highscore).to.eq(expectedHighscore);
        });
    });
  });
});
