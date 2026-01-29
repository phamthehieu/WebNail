import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { productReducer } from '../products/store/product.reducer';
import { ProductEffects } from '../products/store/product.effects';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    DashboardComponent,
  ],
})
export class DashboardModule {}

