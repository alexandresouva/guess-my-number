Feature: Start the game
  As a player,
  I want the game to initialize correctly when I open it,
  so that I can start a new match.

  # Ideally, we can use the DEFAULT_GAME_STATE constant, but for demonstration purposes,
  # I opted to use the table below as an example

  Scenario: Start the game
    Given I am on the game page
    Then the game is in its initial state:
      | secretNumber | ?                   |
      | attempts     | 5                   |
      | score        | 0                   |
      | highscore    | 0                   |
      | timer        | 0.00                |
      | message      | Start guessing...   |
