import { Routes } from '@angular/router';
import { authRoutes } from './features/authentication/authentication.routing';

export const routes: Routes = [
  ...authRoutes,
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
