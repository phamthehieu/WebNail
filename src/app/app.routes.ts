import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/pages/home.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ServicesComponent } from './features/services/pages/services.component';
import { BranchesComponent } from './features/branches/pages/branches.component';
import { OffersComponent } from './features/offers/pages/offers.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'branches', component: BranchesComponent },
      { path: 'offers', component: OffersComponent },
    ],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },

  { path: '**', redirectTo: 'home' },
];
