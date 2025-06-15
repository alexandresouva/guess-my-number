import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { GameService } from '@app/game/services/game.service';
import { GuessCheck } from '@app/game/models/guess-check.model';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let gameServiceSpy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    gameServiceSpy = jasmine.createSpyObj<GameService>('GameService', [
      'checkGuess',
      'attempts',
      'score'
    ]);

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
    it('should update the game message and not call gameService to check the guess when an invalid input is entered', () => {
      const emptyInput = '';
      component['checkGuess'](emptyInput);
      expect(component['gameMessage']()).toBe('🤡 Choice a number');
      expect(gameServiceSpy['checkGuess']).not.toHaveBeenCalled();

      const invalidInput = 'abc';
      component['checkGuess'](invalidInput);
      expect(component['gameMessage']()).toBe('🤡 Choice a number');
      expect(gameServiceSpy['checkGuess']).not.toHaveBeenCalled();
    });

    it('should call gameService to check the guess when a valid input is entered and update the game message', () => {
      const guess = '5';
      const initialMessage = component['gameMessage']();

      gameServiceSpy.checkGuess.and.returnValue({
        number: Number(guess),
        correct: false,
        message: '📈 Too high!'
      });
      component['checkGuess'](guess);
      const finalMessage = component['gameMessage']();

      expect(gameServiceSpy['checkGuess']).toHaveBeenCalledWith(Number(guess));
      expect(finalMessage).not.toBe(initialMessage);
      expect(finalMessage).toBe('📈 Too high!');
    });

    it('should call gameService to check the correct guess and update the secret number and game message', () => {
      const guessCheckMock: GuessCheck = {
        number: 5,
        correct: true,
        message: '🎉 Correct number!'
      };

      gameServiceSpy.checkGuess.and.returnValue(guessCheckMock);
      component['checkGuess'](guessCheckMock.number.toString());

      expect(gameServiceSpy['checkGuess']).toHaveBeenCalledWith(5);
      expect(component['gameMessage']()).toBe('🎉 Correct number!');
      expect(component['secretNumber']()).toBe(guessCheckMock.number);
    });
  });
});
