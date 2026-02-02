import { Component } from '@angular/core';
import { HomeHeroComponent } from '../components/home-hero.component';
import { HomeServicesComponent } from '../components/home-services.component';
import { HomeLocationsComponent } from '../components/home-locations.component';
import { HomeOffersComponent } from '../components/home-offers.component';

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
  ],
})
export class HomeComponent {
  token: string | null = null;
}

