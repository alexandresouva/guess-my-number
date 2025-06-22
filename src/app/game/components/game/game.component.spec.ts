import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { GameService } from '@app/game/services/game.service';
import { GameComponent } from './game.component';

const gameOverSignalMock = signal(false);
const attemptsSignalMock = signal(5);

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj<GameService>(
      'GameService',
      ['checkGuess', 'restart'],
      {
        gameOver: gameOverSignalMock,
        attempts: attemptsSignalMock,
        secretNumber: signal(0),
        score: signal(0),
        highscore: signal(0)
      }
    );

    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [{ provide: GameService, useValue: gameServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checkGuess', () => {
    it('should update the game message and skip guess checking for invalid input', () => {
      component['guess'].set('');
      component['checkGuess']();
      expect(component['gameMessage']()).toBe('🤡 Choose a number');
      expect(gameServiceSpy['checkGuess']).not.toHaveBeenCalled();

      component['guess'].set('abc');
      component['checkGuess']();
      expect(component['gameMessage']()).toBe('🤡 Choose a number');
      expect(gameServiceSpy['checkGuess']).not.toHaveBeenCalled();
    });

    it('should check the guess when a valid input is entered and update the game message', () => {
      const guess = '5';
      const initialMessage = component['gameMessage']();

      gameServiceSpy.checkGuess.and.returnValue({
        correct: false,
        message: '📈 Too high!'
      });
      component['guess'].set(guess);
      component['checkGuess']();
      const finalMessage = component['gameMessage']();

      expect(gameServiceSpy['checkGuess']).toHaveBeenCalledWith(Number(guess));
      expect(finalMessage).not.toBe(initialMessage);
      expect(finalMessage).toBe('📈 Too high!');
    });
  });

  describe('gameOver', () => {
    let nativeElement: HTMLElement;
    let checkButton: HTMLButtonElement;
    let guessInput: HTMLInputElement;

    beforeEach(() => {
      nativeElement = fixture.nativeElement as HTMLElement;
      checkButton = nativeElement.querySelector(
        `[data-testid="check-button"]`
      ) as HTMLButtonElement;

      guessInput = nativeElement.querySelector(
        '[data-testid="guess-input"]'
      ) as HTMLInputElement;
    });

    it('should update the game message, disable the check button and guess input when the gameOver is true', async () => {
      gameOverSignalMock.set(true);
      gameServiceSpy.checkGuess.and.returnValue({
        correct: false,
        message: '🫤 Game over...'
      });

      component['guess'].set('5');
      component['checkGuess']();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component['gameMessage']()).toBe('🫤 Game over...');
      expect(checkButton.disabled).toBe(true);
      expect(guessInput.disabled).toBe(true);
    });

    it('should not disable the check button and guess input when the gameOver is false', async () => {
      gameOverSignalMock.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(checkButton.disabled).toBe(false);
      expect(guessInput.disabled).toBe(false);
    });
  });

  describe('restartGame', () => {
    it('should update the game message', () => {
      component['guess'].set('abc');
      component['checkGuess'](); // will update the initial game message

      component['restart']();
      expect(component['gameMessage']()).toBe('Start guessing...');
    });

    it('should call the GameService to restart the game', () => {
      component['restart']();
      expect(gameServiceSpy['restart']).toHaveBeenCalled();
    });
  });
});
