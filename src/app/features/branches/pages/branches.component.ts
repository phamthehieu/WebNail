import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import * as L from 'leaflet';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import {
  BranchCardComponent,
  BranchCardModel,
} from '../components/branch-card/branch-card.component';

@Component({
  selector: 'app-branches-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    ScrollRevealDirective,
    BranchCardComponent,
  ],
  templateUrl: './branches.component.html',
})
export class BranchesComponent implements AfterViewInit, OnDestroy {
  private map: L.Map | null = null;

  branches: Array<{ revealDelay: number; data: BranchCardModel }> = [
    {
      revealDelay: 0,
      data: {
        title: 'Hà Nội Flagship',
        badgeText: 'Premium',
        badgeClass: 'bg-secondary/20',
        address: '25 Phan Chu Trinh, Hoàn Kiếm, Hà Nội',
        status: 'open',
        statusText: 'Đang mở cửa',
        statusMeta: '09:00 - 21:00',
        imageSrc: 'assets/images/branches/hn-flagship.jpg',
        imageAlt: 'Hà Nội Flagship',
      },
    },
    {
      revealDelay: 80,
      data: {
        title: 'Sài Gòn Studio',
        badgeText: 'Workshop',
        badgeClass: 'bg-vibrant/20',
        address: '128 Nguyễn Chí Thanh, Q.5, TP. Hồ Chí Minh',
        status: 'open',
        statusText: 'Đang mở cửa',
        statusMeta: '08:30 - 22:00',
        imageSrc: 'assets/images/branches/sg-studio.jpg',
        imageAlt: 'Sài Gòn Studio',
      },
    },
    {
      revealDelay: 140,
      data: {
        title: 'Đà Nẵng Express',
        badgeText: 'Quick Service',
        badgeClass: 'bg-accent/20',
        address: '45 Bạch Đằng, Hải Châu, Đà Nẵng',
        status: 'closed',
        statusText: 'Đóng cửa',
        statusMeta: 'Mở lại lúc 09:00',
        imageSrc: 'assets/images/branches/dn-express.jpg',
        imageAlt: 'Đà Nẵng Express',
      },
    },
    {
      revealDelay: 200,
      data: {
        title: 'Cần Thơ Boutique',
        badgeText: 'Local',
        badgeClass: 'bg-joy/20',
        address: '12 Trần Văn Khéo, Ninh Kiều, Cần Thơ',
        status: 'open',
        statusText: 'Đang mở cửa',
        statusMeta: '09:00 - 20:30',
        fallbackIcon: 'spa',
        fallbackBgClass: 'bg-primary/10',
        fallbackIconClass: 'text-primary/40',
      },
    },
    {
      revealDelay: 260,
      data: {
        title: 'Thủ Đức Studio',
        badgeText: 'Express',
        badgeClass: 'bg-secondary/20',
        address: 'Lô A, Vinhomes Grand Park, Thủ Đức',
        status: 'open',
        statusText: 'Đang mở cửa',
        statusMeta: '09:00 - 22:00',
        fallbackIcon: 'wash',
        fallbackBgClass: 'bg-secondary/10',
        fallbackIconClass: 'text-secondary/40',
      },
    },
    {
      revealDelay: 320,
      data: {
        title: 'Hải Phòng Plaza',
        badgeText: 'Boutique',
        badgeClass: 'bg-vibrant/20',
        address: 'Số 1 Lê Thánh Tông, Ngô Quyền, Hải Phòng',
        status: 'closed',
        statusText: 'Đóng cửa',
        statusMeta: 'Mở lại lúc 10:00',
        fallbackIcon: 'face',
        fallbackBgClass: 'bg-vibrant/10',
        fallbackIconClass: 'text-vibrant/40',
      },
    },
  ];

  ngAfterViewInit(): void {
    this.map = L.map('branches-map', {
      zoomControl: true,
      attributionControl: false,
    }).setView([16.0, 106.0], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(this.map);

    const points: Array<{ name: string; coords: [number, number] }> = [
      { name: 'Hà Nội Flagship', coords: [21.0285, 105.8542] },
      { name: 'Sài Gòn Studio', coords: [10.7626, 106.6602] },
      { name: 'Đà Nẵng Express', coords: [16.0471, 108.2062] },
      { name: 'Cần Thơ Boutique', coords: [10.0452, 105.7469] },
      { name: 'Thủ Đức Studio', coords: [10.8493, 106.7537] },
      { name: 'Hải Phòng Plaza', coords: [20.8449, 106.6881] },
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
    this.map.fitBounds(group.getBounds().pad(0.2));

    setTimeout(() => this.map?.invalidateSize(), 0);
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.map = null;
  }
}

