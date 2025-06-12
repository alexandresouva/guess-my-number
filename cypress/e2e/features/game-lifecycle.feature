Feature: Game lifecycle
  As a player, I want the game to start and restart correctly, so that I can play new matches whenever I want.

  Scenario: The game starts correctly
    Given the game has started
    Then the player has 5 attempts available
    And the timer is zero
    And the displayed score is zero
    And the secret number is randomly generated between 1 and 25
    And the initial message is "Start guessing..."

  Scenario: Player restarts the game
    Given the player clicks the "Again" button
    Then the game resets with 5 attempts available
    And the timer is zero
    And the displayed score resets to zero
    And the message shows "Start guessing..."
    And a new secret number is generated between 1 and 25
    And the interface returns to the initial state (hidden number, default styles)
