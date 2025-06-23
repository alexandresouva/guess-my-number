import { Pipe, PipeTransform } from '@angular/core';
import { GameMessage } from '../models/game-message.model';

@Pipe({
  name: 'feedbackEmoji'
})
export class FeedbackEmojiPipe implements PipeTransform {
  transform(message: GameMessage): string {
    const emojiMap: Partial<Record<GameMessage, string>> = {
      'Too high': '📈',
      'Too low': '📉',
      'Correct number': '🎉',
      'Game over': '🫤',
      'Choose a number': '🤡'
    };

    const emoji = emojiMap[message] ?? '';
    return emoji ? `${emoji} ${message}!` : message;
  }
}
