import { Component, signal } from '@angular/core';
import { HomeHeroComponent } from '../components/home-hero.component';
import { HomeServicesComponent } from '../components/home-services.component';
import { HomeLocationsComponent } from '../components/home-locations.component';
import { HomeOffersComponent } from '../components/home-offers.component';
import { OffersVipCtaComponent } from '../../offers/components/offers-vip-cta/offers-vip-cta.component';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    HomeHeroComponent,
    HomeServicesComponent,
    HomeLocationsComponent,
    HomeOffersComponent,
    OffersVipCtaComponent,
    NgIf,
  ],
})
export class HomeComponent {
  token = signal<string | null>(null);

  constructor(private authService: AuthService) {
    this.token.set(this.authService.token);
    console.log(this.token());
  }

}