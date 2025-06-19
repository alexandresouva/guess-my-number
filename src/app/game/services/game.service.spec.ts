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
    it('should return correct result when guess is correct', () => {
      const secretNumber = service['_secretNumber'];
      const result = service.checkGuess(secretNumber);

      expect(timerServiceSpy['stop']).toHaveBeenCalled();
      expect(service.score()).toBeGreaterThan(0);
      expect(result).toEqual({
        number: secretNumber,
        correct: true,
        message: '🎉 Correct number!'
      });
    });

    it('should return correct result when guess is lower', () => {
      const lowerGuess = service['_secretNumber'] - 1;
      const initialAttempts = service.attempts();

      const result = service.checkGuess(lowerGuess);

      expect(timerServiceSpy['start']).toHaveBeenCalled();
      expect(service.attempts()).toBe(initialAttempts - 1);
      expect(result).toEqual({
        number: lowerGuess,
        correct: false,
        message: '📉 Too low!'
      });
    });

    it('should return correct result when guess is higher', () => {
      const higherGuess = service['_secretNumber'] + 1;
      const initialAttempts = service.attempts();

      const result = service.checkGuess(higherGuess);

      expect(timerServiceSpy['start']).toHaveBeenCalled();
      expect(service.attempts()).toBe(initialAttempts - 1);
      expect(result).toEqual({
        number: higherGuess,
        correct: false,
        message: '📈 Too high!'
      });
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
});
