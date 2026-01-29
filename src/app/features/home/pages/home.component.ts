import { Component } from '@angular/core';
import { HomeNavComponent } from '../components/home-nav.component';
import { HomeHeroComponent } from '../components/home-hero.component';
import { HomeServicesComponent } from '../components/home-services.component';
import { HomeLocationsComponent } from '../components/home-locations.component';
import { HomeOffersComponent } from '../components/home-offers.component';
import { HomeFooterComponent } from '../components/home-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    HomeNavComponent,
    HomeHeroComponent,
    HomeServicesComponent,
    HomeLocationsComponent,
    HomeOffersComponent,
    HomeFooterComponent,
  ],
})
export class HomeComponent {
  token: string | null = null;
}

