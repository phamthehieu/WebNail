import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  ServiceCardComponent,
  ServiceCardModel,
} from '../components/service-card/service-card.component';
import { DropdownSelectComponent } from '../../../shared/components/dropdown-select/dropdown-select.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { OffersVipCtaComponent } from '../../offers/components/offers-vip-cta/offers-vip-cta.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [
    CommonModule,
    ServiceCardComponent,
    DropdownSelectComponent,
    ScrollRevealDirective,
    OffersVipCtaComponent,
    TranslateModule,
    NgIf,
  ],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  private readonly translate = inject(TranslateService);

  viewMode: 'grid' | 'list' = 'grid';
  sortValue = 'newest';

  summaryCount = 2;
  summaryTotal = '320.000';
  summaryMinutes = 90;

  token = signal<string | null>(null);

  constructor(private authService: AuthService) {
    this.token.set(this.authService.token);
  }

  get sortOptions() {
    return [
      { value: 'newest', label: this.translate.instant('servicesPage.sort.newest') },
      { value: 'price-asc', label: this.translate.instant('servicesPage.sort.priceAsc') },
      { value: 'price-desc', label: this.translate.instant('servicesPage.sort.priceDesc') },
      { value: 'popular', label: this.translate.instant('servicesPage.sort.popular') },
    ];
  }

  services: Array<{ revealDelay: number; data: ServiceCardModel }> = [
    {
      revealDelay: 0,
      data: {
        title: 'Làm móng tay lụa',
        description:
          'Quy trình chăm sóc chuyên sâu kết hợp dưỡng chất thiên nhiên giúp đôi tay mềm mịn.',
        priceLabel: '170.000đ',
        ratingLabel: '4.9 (120)',
        imageSrc:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD7zWwzcToBnELwU-lhzQhDXzw-KFJJCK4vwsYmT5xvZ7rKXjbslFF6wiLiM7mDyIROQfCvyfJXf6AtXUf9SR92xXaiPiRV9PEjzkAPEo1pXbwSsaaI2R2UUVsMQBWO8qmSSKvdu8kUmF8U5Puyw4-ZVi9Kz_6vGLw19VpgtaFgKpo5bEdxen5df1OCagqH0IJFb21E7irRIZqSmB-7TENDJzDNEY249YRhrA1NdBjJ-KIrgkwtlRwX0y-aP4M3RQL3Ws3LDwKBqwA',
        imageAlt: 'Làm móng tay lụa',
        badgeText: 'Best Seller',
        badgeClass: 'bg-primary text-white',
      },
    },
    {
      revealDelay: 60,
      data: {
        title: 'Sơn Gel Cao Cấp',
        description:
          'Sử dụng dòng gel hữu cơ không gây hại cho móng, độ bền màu lên đến 4 tuần.',
        priceLabel: '150.000đ',
        ratingLabel: '4.8 (85)',
        imageSrc:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAWje80zlq6OVotRvZfxb3huq--xPQ63heqyWjSReHRugZ_q8utGerjc10bprMdAgR7Hav3iuHygxToJ5hoEN2RVsjWbKtlBdM99EsgglG5gK_g_Y6rzTn6KkBrJ9OwkNExjiVcXnH-DptC7YWix6Kr5JXyTnELevc873tXDTNU8bJpEZ2Ec6varRvhiFYb98_spEJ7NHbKB5n1_aa5tjITCKleKyP7Tx47jvgUsvvf472p5KkpPQFBSiOvQUtNBtJQ19i6-sbdHKs',
        imageAlt: 'Sơn Gel Cao Cấp',
        badgeText: 'Organic',
        badgeClass: 'bg-secondary text-textMain',
      },
    },
    {
      revealDelay: 120,
      data: {
        title: 'Vẽ Nghệ Thuật',
        description:
          'Thiết kế độc bản từ các nghệ sĩ nail hàng đầu, thể hiện cá tính riêng của bạn.',
        priceLabel: '100.000đ',
        ratingLabel: '5.0 (52)',
        imageSrc:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBU1-CJQrydKWtzisyz-LvacFIWV3xDL40WUKnr_ublrdS8Yu7lVohJoqFBuhJnEIHUnO0QpXGu-bRa0DR4SEU4yedw_mh9uF6D7nm33Zmis33W2MCcWPoBH45t_Ti2HzYSC_yH8L3DGfEk4f2cbNuN_TmZyrO2d5B6DZrpPtj_s5PS8NfqS9FCG1Tu1-WAhmENf7HpV6s8NhOzRhGAb-evSK3Bo-a_UtAgq1M6yNVo4VrCMrcKfw_cIDchlAm2Efd1dnqcKoREiK4',
        imageAlt: 'Vẽ Nghệ Thuật',
      },
    },
    {
      revealDelay: 180,
      data: {
        title: 'Làm móng chân Spa',
        description:
          'Tẩy tế bào chết và massage thư giãn, mang lại cảm giác nhẹ tênh cho đôi chân.',
        priceLabel: '120.000đ',
        ratingLabel: '4.7 (44)',
        imageSrc:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBP3I-6UQExeN1TUJP2C8rLhaKnQsa98oEus1aKXFkB0hrzEHc141RYVikm0tBssoQL3JVCMmR8w044QbokMH4YVnc--qUTifaqSKBTH0D35iB8JWUk3oM-P7LgMbVhvoD37uyS7-At3isVtGrFYuBWhywq7WaDvguTzG_m14W1arLfJcRzBvbyAgP8yE1BxWBHosl7pPv_sqstnUViokj1K1-2teKoHjOKRWysfFfceSreh_kTcmWTvAhhaLlbuoIuweUqyl9s_Ks',
        imageAlt: 'Làm móng chân Spa',
      },
    },
    {
      revealDelay: 240,
      data: {
        title: 'Combo Gắn Móng Nghệ Thuật',
        description:
          'Dịch vụ trọn gói bao gồm cắt tỉa, gắn móng và thiết kế nghệ thuật cao cấp.',
        priceLabel: '400.000đ',
        ratingLabel: '4.9 (210)',
        imageSrc:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBR8uslhX2lmGf3oVbu3-Myox7o1oNFXzVAfFcZgK2FgDx5E_TKPDNvbGNnlmdPGgejXSxLkcBlAd6EDfao-3Ru7pNOw0nDqUmwhcg6RdvBjcvHpHD_N6mW0K7HpfTRj5SKF7W65QaEwR2jmUbQ8nV_pX_bom2o6Inj8vE8OiSOuWVaTZSYXFFLxs4ZzREpTzrSabF4orYQbA1kywKW6CSnol7Xy4QSacUVs9Gg65c28weF8pXDgGjcCqREPWD4vUtYKQKNSASAMpI',
        imageAlt: 'Combo Gắn Móng Nghệ Thuật',
        badgeText: 'Best Value',
        badgeClass: 'bg-vibrant/90 text-textMain',
      },
    },
    {
      revealDelay: 300,
      data: {
        title: 'Chăm sóc phục hồi Keratin',
        description:
          'Phục hồi móng yếu bằng tinh chất keratin và Vitamin E chuyên sâu.',
        priceLabel: '80.000đ',
        ratingLabel: '4.6 (38)',
        imageSrc:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBSJbE0v3klJTwzyk9KJXDmTt5Zzn6Hz8KfVNp2Yl9TjlhcYxeNpSaoQkZPbq2yGdURoZtQHV9dEHh9F80OrY1h3PqN_GIkkY3ada4t3OywLjDF9-B3ZJIogiIp85QudDYwFzn979E8sySIgh1LoFqN9kod2ER4SYPuN1NvgYZT6zqIdGmygIwE_cUx88TxjvkiuquTzKfZvSVcQq-nXXAQoC9QGxsMmB8tcRwoIrlfK45SiSjztvttx4I97FKS4UrxH_-PnatyWaI',
        imageAlt: 'Chăm sóc phục hồi Keratin',
      },
    },
  ];
}


