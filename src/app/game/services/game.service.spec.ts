import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { TimerService } from './timer.service';
import { signal } from '@angular/core';

const timeSignalMock = signal(0);

describe('GameService', () => {
  let service: GameService;
  let timerServiceSpy: jasmine.SpyObj<TimerService>;

  beforeEach(() => {
    timerServiceSpy = jasmine.createSpyObj<TimerService>(
      'TimerService',
      ['start', 'stop', 'reset'],
      { time: timeSignalMock }
    );

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: TimerService, useValue: timerServiceSpy }
      ]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkGuess', () => {
    beforeEach(() => {
      service['_highscore'].set(0);
    });

    it('should return correct result when guess is correct', () => {
      const secretNumber = service['_secretNumber'];
      const initialHighscore = service.highscore();

      const result = service.checkGuess(secretNumber());

      expect(timerServiceSpy['stop']).toHaveBeenCalled();
      expect(service.score()).toBeGreaterThanOrEqual(10);
      expect(service.highscore()).toBeGreaterThanOrEqual(initialHighscore);
      expect(result).toEqual({
        correct: true,
        message: 'Correct number'
      });
    });

    it('should return correct result when guess is lower', () => {
      const lowerGuess = service['_secretNumber']() - 1;
      const initialAttempts = service.attempts();

      const result = service.checkGuess(lowerGuess);

      expect(timerServiceSpy['start']).toHaveBeenCalled();
      expect(service.attempts()).toBe(initialAttempts - 1);
      expect(result).toEqual({
        correct: false,
        message: 'Too low'
      });
    });

    it('should return correct result when guess is higher', () => {
      const higherGuess = service['_secretNumber']() + 1;
      const initialAttempts = service.attempts();

      const result = service.checkGuess(higherGuess);

      expect(timerServiceSpy['start']).toHaveBeenCalled();
      expect(service.attempts()).toBe(initialAttempts - 1);
      expect(result).toEqual({
        correct: false,
        message: 'Too high'
      });
    });
  });

  describe('_generateSecretNumber', () => {
    it('should always have a secret number between 1 and 25', () => {
      const qtdChecks = 10;

      for (let i = 0; i < qtdChecks; i++) {
        const secretNumber = service['_generateSecretNumber']();
        expect(secretNumber).toBeGreaterThanOrEqual(1);
        expect(secretNumber).toBeLessThanOrEqual(25);
      }
    });
  });

  describe('calculateScore', () => {
    it('should calculate the score correctly', () => {
      const elapsedTime = 5;
      const remainingAttempts = service.attempts();
      timeSignalMock.set(elapsedTime);

      const score = service['_calculateScore']();
      const expected = remainingAttempts * 15 - elapsedTime;

      expect(score).toBe(expected);
    });

    it('should return minimum score of 10 if calculated score is lower', () => {
      timeSignalMock.set(60);
      service['_attempts'].set(1);

      const score = service['_calculateScore']();

      expect(score).toBe(10);
    });
  });

  describe('updateHighscore', () => {
    it('should update highscore if the current score is higher', () => {
      const currentHighscore = service.highscore();
      const newHighscoreHigherThanCurrent = currentHighscore + 10;

      service['_updateHighscore'](newHighscoreHigherThanCurrent);

      expect(service.highscore()).toBe(newHighscoreHigherThanCurrent);
    });

    it('should not update highscore if the current score is lower', () => {
      const initialHighscore = 100;

      service['_highscore'].set(initialHighscore);
      service['_updateHighscore'](initialHighscore - 10);

      expect(service.highscore()).toBe(initialHighscore);
    });
  });

  describe('gameOver', () => {
    it('should update gameOver to true if attempts are 0', () => {
      const attempts = 5;
      for (let i = 0; i < attempts; i++) {
        service.checkGuess(100); // wrong guess
      }

      expect(service.gameOver()).toBe(true);
    });

    it('should be false if attempts are greater than 0', () => {
      const attempts = 4;
      for (let i = 0; i < attempts; i++) {
        service.checkGuess(100); // wrong guess
      }

      expect(service.gameOver()).toBe(false);
    });
  });

  describe('restart', () => {
    it('should restart the game correctly after different numbers of guesses', () => {
      const maxAttempts = 5;
      const generateSecretNumberSpy = spyOn(
        service,
        '_generateSecretNumber' as keyof GameService
      ).and.callThrough();

      for (let i = 0; i <= maxAttempts; i++) {
        for (let j = 0; j < i; j++) {
          service.checkGuess(100);
        }

        service.restart();

        expect(generateSecretNumberSpy).toHaveBeenCalled();
        expect(timerServiceSpy['reset']).toHaveBeenCalled();
        expect(service.gameOver()).toBe(false);
        expect(service.attempts()).toBe(maxAttempts);
        expect(service.score()).toBe(0);
      }
    });

    it('should keep the highscore after restart', () => {
      const secretNumber = service['_secretNumber']();

      service.checkGuess(secretNumber);
      service.restart();

      expect(service.highscore()).toBeGreaterThan(10);
    });
  });

  describe('_loadHighscore', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should return 0 if localStorage is empty', () => {
      expect(service['_loadHighscore']()).toBe(0);
    });

    it('should return stored highscore if it is a valid number', () => {
      localStorage.setItem('guess-my-number-highscore', '150');
      expect(service['_loadHighscore']()).toBe(150);
    });

    it('should return 0 if stored value is not a number', () => {
      localStorage.setItem('guess-my-number-highscore', 'banana');
      expect(service['_loadHighscore']()).toBe(0);
    });

    it('should parse numeric string correctly', () => {
      localStorage.setItem('guess-my-number-highscore', '42');
      expect(service['_loadHighscore']()).toBe(42);
    });
  });
});
