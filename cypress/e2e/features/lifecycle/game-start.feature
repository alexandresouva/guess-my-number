Feature: Start the game
  As a player, I want the game to initialize correctly when I open it, so that I can start a new match.

  Scenario: Start the game
    Given I am on the game page for guessing
    Then I have 5 attempts available
      And the message displayed is "Start guessing..."
      And the game is in its initial state
