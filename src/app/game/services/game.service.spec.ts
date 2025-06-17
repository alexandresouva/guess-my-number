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
      ['start', 'stop'],
      {
        time: timeSignalMock
      }
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

  describe('generateSecretNumber', () => {
    it('should generate the secret number', () => {
      const secretNumber = service['_generateSecretNumber']();

      expect(typeof secretNumber).toBe('number');
      expect(secretNumber).toBeGreaterThanOrEqual(1);
      expect(secretNumber).toBeLessThanOrEqual(25);
    });
  });

  describe('checkGuess', () => {
    it('should return appropriate game result when guess is correct', () => {
      const secretNumber = service['_secretNumber'];
      const result = service.checkGuess(secretNumber);

      expect(result).toEqual({
        number: secretNumber,
        correct: true,
        message: '🎉 Correct number!'
      });
    });

    it('should return appropriate game result for a lower guess', () => {
      const lowerGuess = service['_secretNumber'] - 1;
      const result = service.checkGuess(lowerGuess);

      expect(result).toEqual({
        number: lowerGuess,
        correct: false,
        message: '📉 Too low!'
      });
    });

    it('should return appropriate game result for a higher guess', () => {
      const higherGuess = service['_secretNumber'] + 1;
      const result = service.checkGuess(higherGuess);

      expect(result).toEqual({
        number: higherGuess,
        correct: false,
        message: '📈 Too high!'
      });
    });
  });

  describe('processCorrectGuess', () => {
    it('should call timerService to stop the timer', () => {
      const secretNumber = service['_secretNumber'];
      service['checkGuess'](secretNumber);

      expect(timerServiceSpy['stop']).toHaveBeenCalled();
    });

    it('should call calculateScore to calculate the score', () => {
      spyOn(service, '_calculateScore' as never).and.callThrough();

      const initialScore = service.score();
      const secretNumber = service['_secretNumber'];
      service['checkGuess'](secretNumber);
      const finalScore = service.score();

      expect(service['_calculateScore']).toHaveBeenCalled();
      expect(finalScore).toBeGreaterThan(initialScore);
    });
  });

  describe('calculateScore', () => {
    it('should return the score based on the time taken and remaining attempts', () => {
      const elapsedTimeInSeconds = 5;
      const remainingAttempts = service.attempts();
      const expectedScore = remainingAttempts * 15 - elapsedTimeInSeconds;

      timeSignalMock.set(elapsedTimeInSeconds);

      const score = service['_calculateScore']();
      expect(score).toBe(expectedScore);
    });

    it('should return 10 as the minimum score if the timer is longer or are fewer attempts', () => {
      const elapsedTimeInSeconds = 60; // 1 minute
      service['_attempts'].set(1);

      timeSignalMock.set(elapsedTimeInSeconds);

      const score = service['_calculateScore']();
      expect(score).toBe(10);
    });
  });
});
