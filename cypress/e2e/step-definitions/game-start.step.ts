import {
  DataTable,
  Given,
  Then
} from '@badeball/cypress-cucumber-preprocessor';
import { GameWorld, GameState } from 'cypress/support/models/game.model';

Given('I am on the game page', function (this: GameWorld) {
  this.gamePage.visit();
});

Then(
  'the game is in its initial state:',
  function (this: GameWorld, gameStateTable: DataTable) {
    const expectedState = gameStateTable.rowsHash() as unknown as GameState;

    this.gamePage.assertGameState(expectedState);
  }
);
