import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import {
  StaffPickerComponent,
  StaffOption,
} from '../components/staff-picker/staff-picker.component';
import {
  DropdownSelectComponent,
  type DropdownOption,
} from '../../../shared/components/dropdown-select/dropdown-select.component';
import {
  ServiceCardComponent,
  type ServiceCardModel,
} from '../../services/components/service-card/service-card.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { OffersVipCtaComponent } from '../../offers/components/offers-vip-cta/offers-vip-cta.component';
import { AuthService } from '../../../core/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterLink,
    ScrollRevealDirective,
    StaffPickerComponent,
    DropdownSelectComponent,
    ServiceCardComponent,
    InputFieldComponent,
    OffersVipCtaComponent,
    NgIf,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  branchId: string | null = null;
  fullName = '';
  phone = '';
  serviceId: string | null = null;
  bookingDate = '';
  bookingTime = '';
  selectedStaffId: string | null = 'auto';
  note = '';

  token = signal<string | null>(null);

  branchOptions: DropdownOption[] = [];

  /** Danh sách dịch vụ dạng list (dùng app-service-card viewMode="list") */
  serviceListForBooking: Array<{ id: string; service: ServiceCardModel }> = [];

  /** Id các dịch vụ đã bị xóa khỏi danh sách (ẩn không hiển thị) */
  removedServiceIds: Set<string> = new Set();

  /** Ảnh dịch vụ (cùng nguồn với trang services) */
  private static readonly SERVICE_IMAGES: Array<{
    id: string;
    imageSrc: string;
    imageAlt: string;
    priceLabel: string;
    ratingLabel: string;
    badgeText?: string;
    badgeClass?: string;
    titleKey: string;
    descKey: string;
  }> = [
    {
      id: 'signature',
      titleKey: 'booking.serviceCards.silk.title',
      descKey: 'booking.serviceCards.silk.desc',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD7zWwzcToBnELwU-lhzQhDXzw-KFJJCK4vwsYmT5xvZ7rKXjbslFF6wiLiM7mDyIROQfCvyfJXf6AtXUf9SR92xXaiPiRV9PEjzkAPEo1pXbwSsaaI2R2UUVsMQBWO8qmSSKvdu8kUmF8U5Puyw4-ZVi9Kz_6vGLw19VpgtaFgKpo5bEdxen5df1OCagqH0IJFb21E7irRIZqSmB-7TENDJzDNEY249YRhrA1NdBjJ-KIrgkwtlRwX0y-aP4M3RQL3Ws3LDwKBqwA',
      imageAlt: 'Làm móng tay lụa',
      priceLabel: '170.000đ',
      ratingLabel: '4.9 (120)',
      badgeText: 'Best Seller',
      badgeClass: 'bg-primary text-white',
    },
    {
      id: 'gel',
      titleKey: 'booking.serviceCards.gel.title',
      descKey: 'booking.serviceCards.gel.desc',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAWje80zlq6OVotRvZfxb3huq--xPQ63heqyWjSReHRugZ_q8utGerjc10bprMdAgR7Hav3iuHygxToJ5hoEN2RVsjWbKtlBdM99EsgglG5gK_g_Y6rzTn6KkBrJ9OwkNExjiVcXnH-DptC7YWix6Kr5JXyTnELevc873tXDTNU8bJpEZ2Ec6varRvhiFYb98_spEJ7NHbKB5n1_aa5tjITCKleKyP7Tx47jvgUsvvf472p5KkpPQFBSiOvQUtNBtJQ19i6-sbdHKs',
      imageAlt: 'Sơn Gel Cao Cấp',
      priceLabel: '250.000đ',
      ratingLabel: '5.0 (85)',
      badgeText: 'New',
      badgeClass: 'bg-secondary text-textMain',
    },
    {
      id: '3d',
      titleKey: 'booking.serviceCards.art3d.title',
      descKey: 'booking.serviceCards.art3d.desc',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBU1-CJQrydKWtzisyz-LvacFIWV3xDL40WUKnr_ublrdS8Yu7lVohJoqFBuhJnEIHUnO0QpXGu-bRa0DR4SEU4yedw_mh9uF6D7nm33Zmis33W2MCcWPoBH45t_Ti2HzYSC_yH8L3DGfEk4f2cbNuN_TmZyrO2d5B6DZrpPtj_s5PS8NfqS9FCG1Tu1-WAhmENf7HpV6s8NhOzRhGAb-evSK3Bo-a_UtAgq1M6yNVo4VrCMrcKfw_cIDchlAm2Efd1dnqcKoREiK4',
      imageAlt: 'Vẽ Nghệ Thuật 3D',
      priceLabel: '320.000đ',
      ratingLabel: '4.8 (210)',
    },
    {
      id: 'care',
      titleKey: 'booking.serviceCards.care.title',
      descKey: 'booking.serviceCards.care.desc',
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBP3I-6UQExeN1TUJP2C8rLhaKnQsa98oEus1aKXFkB0hrzEHc141RYVikm0tBssoQL3JVCMmR8w044QbokMH4YVnc--qUTifaqSKBTH0D35iB8JWUk3oM-P7LgMbVhvoD37uyS7-At3isVtGrFYuBWhywq7WaDvguTzG_m14W1arLfJcRzBvbyAgP8yE1BxWBHosl7pPv_sqstnUViokj1K1-2teKoHjOKRWysfFfceSreh_kTcmWTvAhhaLlbuoIuweUqyl9s_Ks',
      imageAlt: 'Spa Chân',
      priceLabel: '290.000đ',
      ratingLabel: '4.7 (98)',
      badgeText: 'Hot',
      badgeClass: 'bg-joy text-white',
    },
  ];

  staffList: StaffOption[] = [
    {
      id: 'auto',
      name: '',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuADGnMIj9fc9NqZz4ENdW0CG8dGrU0eF69ShPIZfFTxLjpzMU7hZc9pvrmi_tF56ya1CqaCuLKlnsdd2mvZ8uNberzbcyAoWCsRRvPTsUNbf1Yng33GOskCBu7Nc76DUg2PDRl8woG_S9HkMVZGYMQ0c0nRzawFrOFDV8647PppXvr89sRdkHDZMVHkZeSPLqQbAV2FENKiwsc7ZNlXqClKaIxyvUXYX8DZcDRixxzdMeAYQl1edxjSy6H-qKiz1uFVz_eYxu9ogyA',
      isRandom: true,
    },
    {
      id: '1',
      name: 'Ngọc Anh',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDOeqyC0OsqMK3PlizD9jxSzcbsgDTjPOxSXdpHrEg3jIAMquNrqel-KyKbdv1CyCkWZKSyat3erGDgXZSrhXQkzUmLYibNHRzziHjlTEPyz9obOj0kReS9YYoAkrAXr9MB0JATWDW6UUKV1qWFxIfuRpj38bODUM_8IMoIo4pCdax5cVLR0sW4yHlQy4ZLxLKZEve6M08ScqBlj4j_od3bisp8ApElkLsvdjY_JGpXMwqN2q6D40PKtCJXrYc1CM0r4B_NS1ht1so',
    },
    {
      id: '2',
      name: 'Minh Thư',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAKPB4_6zBsXbfWEMfS5-schhLSqY_x4Btt2Nc6QqP0DTy9kRVffa61W5TdmEaKbnBaPKvj62x0KQ-6Of1DlYZ3X8D_iGoFU-61DWjXFC-j3hzuq7IlEvDul1kZzhCZGPTgddqAnHH9bX2n1HTs5-c9_l0LD1PMPOMoFUpHAqPSKkcDeFBmsnR2tc6vgt-v6ugkYYyGB51gEsVzk5ToxFvDnZzPDlIJReRpPzqIRpxjWg7ntHpJ5iWMOf-zjtJPeMBWqS_oBouyBqg',
    },
    {
      id: '3',
      name: 'Hồng Nhung',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuADGnMIj9fc9NqZz4ENdW0CG8dGrU0eF69ShPIZfFTxLjpzMU7hZc9pvrmi_tF56ya1CqaCuLKlnsdd2mvZ8uNberzbcyAoWCsRRvPTsUNbf1Yng33GOskCBu7Nc76DUg2PDRl8woG_S9HkMVZGYMQ0c0nRzawFrOFDV8647PppXvr89sRdkHDZMVHkZeSPLqQbAV2FENKiwsc7ZNlXqClKaIxyvUXYX8DZcDRixxzdMeAYQl1edxjSy6H-qKiz1uFVz_eYxu9ogyA',
    },
    {
      id: '4',
      name: 'Isabelle',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDOeqyC0OsqMK3PlizD9jxSzcbsgDTjPOxSXdpHrEg3jIAMquNrqel-KyKbdv1CyCkWZKSyat3erGDgXZSrhXQkzUmLYibNHRzziHjlTEPyz9obOj0kReS9YYoAkrAXr9MB0JATWDW6UUKV1qWFxIfuRpj38bODUM_8IMoIo4pCdax5cVLR0sW4yHlQy4ZLxLKZEve6M08ScqBlj4j_od3bisp8ApElkLsvdjY_JGpXMwqN2q6D40PKtCJXrYc1CM0r4B_NS1ht1so',
    },
  ];

  constructor(private translate: TranslateService, private authService: AuthService) {
    this.token.set(this.authService.token);
  }

  ngOnInit(): void {
    this.buildOptions();
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.buildOptions());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildOptions(): void {
    this.branchOptions = [
      { value: 'hn', label: this.translate.instant('booking.branches.hn') },
      { value: 'sg', label: this.translate.instant('booking.branches.sg') },
    ];
    this.serviceListForBooking = BookingComponent.SERVICE_IMAGES.map(
      (item) => ({
        id: item.id,
        service: {
          title: this.translate.instant(item.titleKey),
          description: this.translate.instant(item.descKey),
          priceLabel: item.priceLabel,
          ratingLabel: item.ratingLabel,
          imageSrc: item.imageSrc,
          imageAlt: item.imageAlt,
          badgeText: item.badgeText,
          badgeClass: item.badgeClass,
        },
      })
    );
    const randomName = this.translate.instant('booking.staff.random');
    const autoStaff = this.staffList.find((s) => s.id === 'auto');
    if (autoStaff) {
      autoStaff.name = randomName;
    }
  }

  /** Xóa dịch vụ ra khỏi danh sách (ẩn và bỏ chọn nếu đang chọn) */
  removeService(id: string): void {
    this.removedServiceIds.add(id);
    if (this.serviceId === id) {
      this.serviceId = null;
    }
  }

  /** Dịch vụ còn hiển thị (chưa bị xóa) */
  get visibleServiceList(): Array<{ id: string; service: ServiceCardModel }> {
    return this.serviceListForBooking.filter(
      (item) => !this.removedServiceIds.has(item.id)
    );
  }

  onSubmit(): void {
    console.log('Booking', {
      branchId: this.branchId,
      fullName: this.fullName,
      phone: this.phone,
      serviceId: this.serviceId,
      date: this.bookingDate,
      time: this.bookingTime,
      staffId: this.selectedStaffId,
      note: this.note,
    });
    // TODO: gửi API đặt lịch
  }
}
