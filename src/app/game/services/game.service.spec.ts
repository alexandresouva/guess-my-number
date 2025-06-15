import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { TimerService } from './timer.service';

describe('GameService', () => {
  let service: GameService;
  let timerServiceSpy: jasmine.SpyObj<TimerService>;

  beforeEach(() => {
    timerServiceSpy = jasmine.createSpyObj('TimerService', [
      'start',
      'stop',
      'time'
    ]) as jasmine.SpyObj<TimerService>;

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
    it('should return "correct" for the correct guess', () => {
      const secretNumber = service['_secretNumber'];
      const result = service.checkGuess(secretNumber);

      expect(result).toEqual({
        number: secretNumber,
        correct: true,
        message: '🎉 Correct number!'
      });
    });

    it('should return incorrect for a lower guess', () => {
      const lowerGuess = service['_secretNumber'] - 1;
      const result = service.checkGuess(lowerGuess);

      expect(result).toEqual({
        number: lowerGuess,
        correct: false,
        message: '📉 Too low!'
      });
    });

    it('should return incorrect for a higher guess', () => {
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
      Object.defineProperty(timerServiceSpy, 'time', {
        get: () => 2
      });
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
      const elaseTimeInSeconds = 5;
      const remainingAttempts = service.attempts();
      const expectedScore = remainingAttempts * 15 - elaseTimeInSeconds;

      Object.defineProperty(timerServiceSpy, 'time', {
        get: () => elaseTimeInSeconds
      });

      const score = service['_calculateScore']();
      expect(score).toBe(expectedScore);
    });

    it('should return 10 as the minimum score if the timer is longer or are fewer attempts', () => {
      const elaseTimeInSeconds = 60; // 1 minute
      service['_attempts'].set(1);

      Object.defineProperty(timerServiceSpy, 'time', {
        get: () => elaseTimeInSeconds
      });

      const score = service['_calculateScore']();
      expect(score).toBe(10);
    });
  });
});
