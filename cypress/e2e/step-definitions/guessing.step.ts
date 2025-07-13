import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { GameWorld } from 'cypress/support/models/game.model';

Given(
  /^I have at least (\d+) attempt(?:s)? remaining$/,
  function (this: GameWorld, attempts: number) {
    const randomAttempts = Math.floor(Math.random() * (6 - attempts));

    this.gamePage.submitWrongGuesses(randomAttempts);
    this.gamePage.assertRemainingAttempts(attempts, 'gte');
  }
);

When('I guess the correct number', function (this: GameWorld) {
  this.gamePage.submitCorrectGuess();
});

When(
  'I submit a guess higher than the secret number',
  function (this: GameWorld) {
    this.gamePage.submitGuessHigherThanSecret();
  }
);

When(
  'I submit a guess lower than the secret number',
  function (this: GameWorld) {
    this.gamePage.submitGuessLowerThanSecret();
  }
);

Then(
  'the message {string} is displayed',
  function (this: GameWorld, message: string) {
    this.gamePage.assertGameMessageIsDisplayed(message);
  }
);

Then('the timer keeps running', function (this: GameWorld) {
  this.gamePage.assertTimerIsRunning();
});

Then(
  'my remaining attempts are decreased by attempts that were used',
  function (this: GameWorld) {
    this.gamePage.assertAttemptsAreDecreased();
  }
);
