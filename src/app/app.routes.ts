import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/pages/home.component').then((m) => m.HomeComponent),
        data: { animation: 'home' },
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/pages/services.component').then(
            (m) => m.ServicesComponent
          ),
        data: { animation: 'services' },
      },
      {
        path: 'branches',
        loadComponent: () =>
          import('./features/branches/pages/branches.component').then(
            (m) => m.BranchesComponent
          ),
        data: { animation: 'branches' },
      },
      {
        path: 'offers',
        loadComponent: () =>
          import('./features/offers/pages/offers.component').then(
            (m) => m.OffersComponent
          ),
        data: { animation: 'offers' },
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./features/booking/pages/booking.component').then(
            (m) => m.BookingComponent
          ),
        data: { animation: 'booking' },
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/pages/profile.component').then(
            (m) => m.ProfileComponent
          ),
        data: { animation: 'profile' },
      },
    ],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },

  { path: '**', redirectTo: 'home' },
];
