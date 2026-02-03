import { Component, signal, OnInit } from '@angular/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { OfferCardComponent, OfferCardModel } from '../components/offer-card/offer-card.component';
import { OffersFilterPillsComponent } from '../components/offers-filter-pills/offers-filter-pills.component';
import { OffersGiftCardComponent } from '../components/offers-gift-card/offers-gift-card.component';
import { OffersHeroComponent } from '../components/offers-hero/offers-hero.component';
import { OffersVipCtaComponent } from '../components/offers-vip-cta/offers-vip-cta.component';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [
    ScrollRevealDirective,
    OffersHeroComponent,
    OffersFilterPillsComponent,
    OfferCardComponent,
    OffersGiftCardComponent,
    OffersVipCtaComponent,
  ],
  templateUrl: './offers.component.html',
})
export class OffersComponent implements OnInit {
  activeFilterId = signal<string>('all');
  /** Bật sau khi view init để chạy animation vào trang */
  pageEntered = signal(false);

  ngOnInit(): void {
    requestAnimationFrame(() => this.pageEntered.set(true));
  }

  filters = [
    { id: 'all', labelKey: 'offersPage.filters.all' },
    { id: 'member', labelKey: 'offersPage.filters.member' },
    { id: 'new', labelKey: 'offersPage.filters.newService' },
    { id: 'event', labelKey: 'offersPage.filters.event' },
  ];

  offers: OfferCardModel[] = [
    {
      id: '1',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuADGnMIj9fc9NqZz4ENdW0CG8dGrU0eF69ShPIZfFTxLjpzMU7hZc9pvrmi_tF56ya1CqaCuLKlnsdd2mvZ8uNberzbcyAoWCsRRvPTsUNbf1Yng33GOskCBu7Nc76DUg2PDRl8woG_S9HkMVZGYMQ0c0nRzawFrOFDV8647PppXvr89sRdkHDZMVHkZeSPLqQbAV2FENKiwsc7ZNlXqClKaIxyvUXYX8DZcDRixxzdMeAYQl1edxjSy6H-qKiz1uFVz_eYxu9ogyA',
      discount: '-20%',
      badgeKey: 'bestSeller',
      badgeClass: 'bg-primary',
      discountDelay: '0s',
    },
    {
      id: '2',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDOeqyC0OsqMK3PlizD9jxSzcbsgDTjPOxSXdpHrEg3jIAMquNrqel-KyKbdv1CyCkWZKSyat3erGDgXZSrhXQkzUmLYibNHRzziHjlTEPyz9obOj0kReS9YYoAkrAXr9MB0JATWDW6UUKV1qWFxIfuRpj38bODUM_8IMoIo4pCdax5cVLR0sW4yHlQy4ZLxLKZEve6M08ScqBlj4j_od3bisp8ApElkLsvdjY_JGpXMwqN2q6D40PKtCJXrYc1CM0r4B_NS1ht1so',
      discount: '-15%',
      badgeKey: 'newArrival',
      badgeClass: 'bg-secondary text-slate-800',
      discountDelay: '-1s',
    },
    {
      id: '3',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAKPB4_6zBsXbfWEMfS5-schhLSqY_x4Btt2Nc6QqP0DTy9kRVffa61W5TdmEaKbnBaPKvj62x0KQ-6Of1DlYZ3X8D_iGoFU-61DWjXFC-j3hzuq7IlEvDul1kZzhCZGPTgddqAnHH9bX2n1HTs5-c9_l0LD1PMPOMoFUpHAqPSKkcDeFBmsnR2tc6vgt-v6ugkYYyGB51gEsVzk5ToxFvDnZzPDlIJReRpPzqIRpxjWg7ntHpJ5iWMOf-zjtJPeMBWqS_oBouyBqg',
      discount: '-30%',
      badgeKey: 'limited',
      badgeClass: 'bg-purple-400',
      discountDelay: '-2s',
    },
    {
      id: '4',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuADGnMIj9fc9NqZz4ENdW0CG8dGrU0eF69ShPIZfFTxLjpzMU7hZc9pvrmi_tF56ya1CqaCuLKlnsdd2mvZ8uNberzbcyAoWCsRRvPTsUNbf1Yng33GOskCBu7Nc76DUg2PDRl8woG_S9HkMVZGYMQ0c0nRzawFrOFDV8647PppXvr89sRdkHDZMVHkZeSPLqQbAV2FENKiwsc7ZNlXqClKaIxyvUXYX8DZcDRixxzdMeAYQl1edxjSy6H-qKiz1uFVz_eYxu9ogyA',
      discount: '-10%',
      discountDelay: '-0.5s',
    },
    {
      id: '5',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDOeqyC0OsqMK3PlizD9jxSzcbsgDTjPOxSXdpHrEg3jIAMquNrqel-KyKbdv1CyCkWZKSyat3erGDgXZSrhXQkzUmLYibNHRzziHjlTEPyz9obOj0kReS9YYoAkrAXr9MB0JATWDW6UUKV1qWFxIfuRpj38bODUM_8IMoIo4pCdax5cVLR0sW4yHlQy4ZLxLKZEve6M08ScqBlj4j_od3bisp8ApElkLsvdjY_JGpXMwqN2q6D40PKtCJXrYc1CM0r4B_NS1ht1so',
      discount: '-25%',
      badgeKey: 'hot',
      badgeClass: 'bg-rose-400',
      discountDelay: '-2.5s',
    },
  ];
}
