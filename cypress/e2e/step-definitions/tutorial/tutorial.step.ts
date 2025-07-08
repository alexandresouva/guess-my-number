import { Given } from '@badeball/cypress-cucumber-preprocessor';

// Fake steps, only for testing purposes
Given('I am on the fake situation', () => {
  return 'pending';
});

Given('I am on the fake situation [2]', () => {
  return 'skipped';
});
