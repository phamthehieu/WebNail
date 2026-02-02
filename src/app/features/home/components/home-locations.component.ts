import { AfterViewInit, Component, OnDestroy, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import * as L from 'leaflet';
import { ThemeService } from '../../../core/services/theme.service';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home-locations',
  standalone: true,
  imports: [MatIconModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './home-locations.component.html',
})
export class HomeLocationsComponent implements AfterViewInit, OnDestroy {
  private map: L.Map | null = null;
  private tileLayer: L.TileLayer | null = null;
  private readonly themeService = inject(ThemeService);
  private readonly destroyThemeEffect = effect(() => {
    const theme = this.themeService.theme();
    if (!this.map) return;
    this.setBaseLayer(theme);
  });

  private setBaseLayer(theme: 'light' | 'dark') {
    if (!this.map) return;

    const url =
      theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    if (this.tileLayer) {
      this.tileLayer.removeFrom(this.map);
      this.tileLayer = null;
    }

    this.tileLayer = L.tileLayer(url, {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.map = L.map('home-locations-map', {
      zoomControl: false,
      attributionControl: false,
    }).setView([16.0, 106.0], 5);

    this.setBaseLayer(this.themeService.theme());

    const points: Array<{ name: string; coords: [number, number] }> = [
      { name: 'Hà Nội Flagship', coords: [21.0285, 105.8542] },
      { name: 'Sài Gòn Studio', coords: [10.7626, 106.6602] },
    ];

    const markers = points.map((p) =>
      L.circleMarker(p.coords, {
        radius: 8,
        color: '#fb7185',
        weight: 2,
        fillColor: '#fb7185',
        fillOpacity: 0.9,
      })
        .addTo(this.map!)
        .bindPopup(`<b>${p.name}</b>`)
    );

    const group = L.featureGroup(markers);
    this.map.fitBounds(group.getBounds().pad(0.25));

    setTimeout(() => this.map?.invalidateSize(), 0);
  }

  zoomIn(): void {
    this.map?.zoomIn();
  }

  zoomOut(): void {
    this.map?.zoomOut();
  }

  ngOnDestroy(): void {
    this.destroyThemeEffect.destroy();

    this.tileLayer?.remove();
    this.tileLayer = null;
    this.map?.remove();
    this.map = null;
  }
}


