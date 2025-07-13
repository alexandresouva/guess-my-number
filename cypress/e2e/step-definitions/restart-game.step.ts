import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { DEFAULT_GAME_STATE } from 'cypress/support/common/constants';
import { GameWorld } from 'cypress/support/models/game.model';

Given(
  `I have all {int} attempts`,
  function (this: GameWorld, attempts: number) {
    this.gamePage.assertRemainingAttempts(attempts);
  }
);

Given('I click the "Restart" button', function (this: GameWorld) {
  this.gamePage.clickOnRestartButton();
});

Then('the game resets', function (this: GameWorld) {
  this.gamePage.assertGameState(DEFAULT_GAME_STATE);
});

Given('I have made the correct guess', function (this: GameWorld) {
  this.gamePage.submitCorrectGuess();
});

Given(
  `I have made at least {int} guess`,
  function (this: GameWorld, attempts: number) {
    this.gamePage.submitWrongGuesses(attempts);
  }
);

Then('the highscore should not be cleaned', function (this: GameWorld) {
  this.gamePage.assertHighscoreWasNotCleaned();
});
