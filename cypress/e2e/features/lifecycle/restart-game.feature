Feature: Restart the game
  As a player, I want to restart the game after a match, so that I can play a new round with the game fully reset.

  Scenario: Restart the game even if I haven't made any guesses
    Given I am on the game page for guessing
      And I have not made any guesses
      And I click the "Restart" button
    Then the game resets

  Scenario: Restart the game during a game
    Given I am on the game page for guessing
      And I have made at least 1 guess
      And I click the "Restart" button
    Then the game resets

  Scenario: Restart the game after a win
    Given I am on the game page for guessing
      And I have made the correct guess
      And I click the "Restart" button
    Then the game resets
      And the highscore should not be cleaned
      And the game styles should be updated

  Scenario: Restart the game after a loss
    Given I am on the game page for guessing
      And I have made all 5 incorrect guesses
      And I click the "Restart" button
    Then the game resets


