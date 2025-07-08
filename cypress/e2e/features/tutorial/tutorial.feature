Feature: Fake step example

# Scenario: A fake step, only for showing how to create a pending step
Scenario: A fake step
  Given I am on the fake situation
  When I make a fake guess
  Then the fake result will happen

# Will be skipped because the previous step is pending
Scenario: Second fake step
  Given I am on the fake situation [2]
  When I make a fake guess
  Then the fake result will happen
