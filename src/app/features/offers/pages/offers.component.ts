import { Component } from '@angular/core';
import { HomeOffersComponent } from '../../home/components/home-offers.component';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [HomeOffersComponent],
  templateUrl: './offers.component.html',
})
export class OffersComponent {}

