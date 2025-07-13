import { Then, Step, Given } from '@badeball/cypress-cucumber-preprocessor';
import { GameWorld } from 'cypress/support/models/game.model';

Given(
  'I have made all {int} incorrect guesses',
  function (this: GameWorld, attempts: number) {
    this.gamePage.submitWrongGuesses(attempts);
    this.gamePage.assertRemainingAttempts(0);
  }
);

Then('the game is over', function (this: GameWorld) {
  Step(this, 'the timer stops');
  Step(this, 'the secret number is revealed');
  Step(this, `I can't make any more guesses`);
});

Then('the timer stops', function (this: GameWorld) {
  this.gamePage.assertTimerIsStopped();
});

Then('the secret number is revealed', function (this: GameWorld) {
  this.gamePage.assertSecretNumberIsRevealed();
});

Then(`I can't make any more guesses`, function (this: GameWorld) {
  this.gamePage.assertNoMoreGuessesAllowed();
});

Then('my final score is {int}', function (this: GameWorld, score: number) {
  this.gamePage.assertScoreIsDisplayed(score);
});

Then(
  'my final score is at least {int}',
  function (this: GameWorld, score: number) {
    this.gamePage.assertScoreIsDisplayed(score, 'gte');
  }
);

Then(
  'And the highscore reflects the highest score so far',
  function (this: GameWorld) {
    this.gamePage.assertHighscoreIsCorrect();
  }
);
