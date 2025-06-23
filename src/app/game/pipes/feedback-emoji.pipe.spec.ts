import { FeedbackEmojiPipe } from './feedback-emoji.pipe';

describe('FeedbackEmojiPipe', () => {
  let pipe: FeedbackEmojiPipe;

  beforeEach(() => {
    pipe = new FeedbackEmojiPipe();
  });

  it('create an instance', () => {
    pipe = new FeedbackEmojiPipe();
    expect(pipe).toBeTruthy();
  });

  it('should add 📈 to "Too high"', () => {
    const result = pipe.transform('Too high');
    expect(result).toBe('📈 Too high!');
  });

  it('should add 📉 to "Too low"', () => {
    const result = pipe.transform('Too low');
    expect(result).toBe('📉 Too low!');
  });

  it('should add 🎉 to "Correct number"', () => {
    const result = pipe.transform('Correct number');
    expect(result).toBe('🎉 Correct number!');
  });

  it('should add 🫤 to "Game over"', () => {
    const result = pipe.transform('Game over');
    expect(result).toBe('🫤 Game over!');
  });

  it('should add 🤡 to "Choose a number"', () => {
    const result = pipe.transform('Choose a number');
    expect(result).toBe('🤡 Choose a number!');
  });

  it('should return "Start guessing..." without emoji', () => {
    const result = pipe.transform('Start guessing...');
    expect(result).toBe('Start guessing...');
  });
});
