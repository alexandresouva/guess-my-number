import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

import { SELECTORS } from 'cypress/support/common/selectors';
import {
  captureInitialGameVisualState,
  capturePostGuessVisualState
} from 'cypress/support/helpers/game-visual-state';
import {
  captureFinalScore,
  captureHighscore
} from 'cypress/support/helpers/score';

When('I guess the correct number', function () {
  cy.getByAlias<number>('secretNumber').then((secretNumber) => {
    captureInitialGameVisualState();
    captureHighscore();

    cy.get(SELECTORS.GUESS_INPUT).clear().type(String(secretNumber));
    cy.get(SELECTORS.CHECK_BUTTON).click();

    capturePostGuessVisualState();
  });
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
  cy.getByAlias<string>('initialBackgroundColor').then((initialColor) => {
    cy.get(SELECTORS.GAME_CONTAINER)
      .invoke('css', 'background-color')
      .then((currentColor) => {
        expect(currentColor).not.to.eq(initialColor);
      });
  });

  cy.getByAlias<number>('secretNumberInitialWidth').then((initialWidth) => {
    cy.get(SELECTORS.SECRET_NUMBER)
      .invoke('outerWidth')
      .then((newWidth) => {
        expect(newWidth).to.be.greaterThan(initialWidth);
      });
  });
});

Then('the final score is calculated and displayed', () => {
  cy.get(SELECTORS.SCORE)
    .should('be.visible')
    .invoke('text')
    .then((score) => {
      const scoreNumber = Number(score);
      expect(scoreNumber).to.be.a('number').and.to.be.greaterThan(10);
    });
});

Then('the high score is updated if necessary', () => {
  captureFinalScore();
  cy.getByAlias<number>('finalScore').then((finalScore) => {
    cy.getByAlias<number>('previousHighscore').then((previousHighscore) => {
      cy.get(SELECTORS.HIGHSCORE)
        .should('be.visible')
        .invoke('text')
        .then((highscoreText) => {
          const highscore = Number(highscoreText.trim());
          const expectedHighscore = Math.max(finalScore, previousHighscore);

          expect(highscore).to.be.a('number');
          expect(highscore).to.eq(expectedHighscore);
        });
    });
  });
});
