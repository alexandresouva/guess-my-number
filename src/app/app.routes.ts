import { Routes } from '@angular/router';
import { GameComponent } from '@game/components/game/game.component';

export const routes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: 'game' }
];
