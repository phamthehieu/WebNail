import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/pages/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },


  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
