import { GameWorld } from '../models/game.model';
import { GamePage } from '../pages/game';

beforeEach(function () {
  const world = {
    gamePage: new GamePage()
  } as GameWorld;

  Object.assign(this, world);
});
