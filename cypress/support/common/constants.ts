import { environment } from 'src/environments/environment';

export const PAGES = {
  HOME: `${environment.baseUrl}/`,
  GAME: `${environment.baseUrl}/game`
} as const;
