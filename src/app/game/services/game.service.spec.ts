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
      'timeMs'
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
      const secretNumber = service['_generateSecretNumber']();
      const result = service.checkGuess(secretNumber);

      expect(result).toBe({
        number: secretNumber,
        correct: true,
        message: '🎉 Correct number!'
      });
    });

    it('should return incorrect for a lower guess', () => {
      const lowerGuess = service['_generateSecretNumber']() - 1;
      const result = service.checkGuess(lowerGuess);

      expect(result).toBe({
        number: lowerGuess,
        correct: false,
        message: '📉 Too low!'
      });
    });

    it('should return incorrect for a higher guess', () => {
      const higherGuess = service['_generateSecretNumber']() + 1;
      const result = service.checkGuess(higherGuess);

      expect(result).toBe({
        number: higherGuess,
        correct: false,
        message: '📈 Too high!'
      });
    });
  });

  describe('processCorrectGuess', () => {
    it('should call timerService to stop the timer', () => {
      const secretNumber = service['_generateSecretNumber']();
      service['checkGuess'](secretNumber);

      expect(timerServiceSpy['start']).toHaveBeenCalled();
    });

    it('should call calculateScore to calculate the score', () => {
      const initialScore = service.score();
      const secretNumber = service['_generateSecretNumber']();
      service['checkGuess'](secretNumber);
      const finalScore = service.score();

      expect(service['_calculateScore']).toHaveBeenCalled();
      expect(finalScore).toBeGreaterThan(initialScore);
    });
  });

  describe('calculateScore', () => {
    it('should return the score based on the time taken and remaining attempts', () => {
      const elapsedTimeInMs = 5000;
      const remainingAttempts = service.attempts();
      const expectedScore = remainingAttempts * 15 - elapsedTimeInMs;

      Object.defineProperty(timerServiceSpy, 'timeMs', {
        get: () => elapsedTimeInMs
      });

      const score = service['_calculateScore']();
      expect(score).toBe(expectedScore);
    });

    it('should return 10 as the minimum score if the timer is longer or are fewer attempts', () => {
      const elapsedTimeInMs = 60000; // 1 minute
      service['_attempts'].set(1);

      Object.defineProperty(timerServiceSpy, 'timeMs', {
        get: () => elapsedTimeInMs
      });

      const score = service['_calculateScore']();
      expect(score).toBe(10);
    });
  });
});
