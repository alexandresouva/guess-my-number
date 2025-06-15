Feature: Player makes a correct guess
  As a player, I want to receive clear feedback when I guess correctly, so that I know I’ve won and can see my score.

  # Tip: The focus of BDD is to describe "what" and not "how" things work.
  Scenario: Player guesses the correct number
  Given I am on the game page for guessing
  When I guess the correct number
  Then the message "🎉 Correct number!" is displayed
    And the timer stops immediately
    And the interface is updated to show the correct guess
    And the secret number is revealed
    And the final score is calculated and displayed

