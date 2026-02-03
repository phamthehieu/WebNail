import { Component, OnInit, signal, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileHeaderComponent, UserProfile } from '../components/profile-header/profile-header.component';
import { PersonalInfoFormComponent } from '../components/personal-info-form/personal-info-form.component';
import { BookingHistoryItemComponent, BookingHistoryItem } from '../components/booking-history-item/booking-history-item.component';
import { ProfileTabsComponent, TabId } from '../components/profile-tabs/profile-tabs.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ProfileHeaderComponent,
    ProfileTabsComponent,
    PersonalInfoFormComponent,
    BookingHistoryItemComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, AfterViewInit {
  private readonly cdr = inject(ChangeDetectorRef);
  
  readonly activeTab = signal<TabId>('personal-info');
  readonly pageEntered = signal(false);

  user: UserProfile = {
    name: 'Ngọc Anh Do',
    email: 'ngocanh.do@gmail.com',
    phone: '0912 345 678',
    birthDate: '1998-10-20',
    address: 'Vincom Center, Quận 1, TP.HCM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI2LWogkxASk4KbEmul1Z6B2Qp78LlXee9D1q0rt-z4GTbgWP-XmOGSJwiQzR7L9W_WSXcNo-kCwt8MgrEzJyl_N26M0XjP1npZHdW5GaMi__mg3n1Ca_k3bmKPXX_q1eZwPhGQ6MHdONOqtGIMfutANHV2gehi9UQ58dFoAvIulTo_pRbz39SGyIFfpXwcqmqJET4MQxM4U3TGpN7k-h4sLro98N-qo5_XgsLx0HQ-RMddceiJbbEmD_Rk-WisqEdmfkmV1Mjrmev',
    memberLevel: 'VIP',
    joinDate: '10/2023',
    bookingCount: 12,
    points: 850,
    nextLevel: 'Diamond Member',
    pointsToNext: 150,
    progressPercent: 75,
    emailNotifications: true,
  };

  readonly bookingHistory: BookingHistoryItem[] = [
    {
      id: '1',
      date: '20',
      month: 'Th10',
      year: '2023',
      service: 'Combo Làm Móng Nghệ Thuật Mùa Thu',
      time: '14:30',
      location: 'Chi nhánh Quận 1',
      stylist: 'Mai Chi',
      status: 'completed',
      price: '850.000đ',
      dateColor: 'rose',
    },
    {
      id: '2',
      date: '05',
      month: 'Th09',
      year: '2023',
      service: 'Sơn Gel Cao Cấp & Chăm Sóc Da Tay',
      time: '10:00',
      location: 'Chi nhánh Thảo Điền',
      stylist: 'Lan Ngọc',
      status: 'completed',
      price: '450.000đ',
      dateColor: 'indigo',
    },
    {
      id: '3',
      date: '12',
      month: 'Th08',
      year: '2023',
      service: 'Gội Đầu Thảo Dược & Massage',
      time: '16:30',
      location: 'Chi nhánh Quận 3',
      status: 'cancelled',
      price: '300.000đ',
      dateColor: 'gray',
    },
    {
      id: '4',
      date: '28',
      month: 'Th07',
      year: '2023',
      service: 'Đính Đá Swarovski & Vẽ 3D',
      time: '09:00',
      location: 'Chi nhánh Quận 1',
      stylist: 'Mai Chi',
      status: 'completed',
      price: '1.200.000đ',
      dateColor: 'amber',
    },
  ];

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.pageEntered.set(true);
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.setupScrollReveal();
  }

  onTabChange(tabId: TabId): void {
    this.activeTab.set(tabId);
    this.animateTabTransition(tabId);
  }

  private animateTabTransition(tabId: TabId): void {
    const currentContent = document.querySelector('.tab-content.active');
    const nextContent = document.getElementById(tabId);
    
    if (!nextContent) return;

    const currentTab = this.activeTab();
    const direction = currentTab === 'booking-history' && tabId === 'personal-info' ? 'left' : 'right';

    // Animate out current
    if (currentContent && currentContent !== nextContent) {
      currentContent.classList.remove('active');
      if (direction === 'left') {
        currentContent.classList.add('exit-right');
      } else {
        currentContent.classList.add('exit-left');
      }
      setTimeout(() => {
        currentContent.classList.remove('exit-left', 'exit-right');
        currentContent.classList.add('hidden');
      }, 400);
    }

    // Animate in next
    nextContent.classList.remove('hidden', 'exit-left', 'exit-right');
    if (direction === 'left') {
      nextContent.style.transform = 'translateX(-50px)';
    } else {
      nextContent.style.transform = 'translateX(50px)';
    }
    nextContent.style.opacity = '0';
    
    void nextContent.offsetWidth; // Force reflow
    
    nextContent.style.transform = '';
    nextContent.style.opacity = '';
    nextContent.classList.add('active');
  }

  private setupScrollReveal(): void {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach((el) => {
      observer.observe(el);
    });
  }

  onSaveChanges(updatedUser: UserProfile): void {
    // TODO: Implement save logic with API call
    console.log('Saving changes...', updatedUser);
    // In real app: this.userService.updateProfile(updatedUser).subscribe(() => {
    //   this.user = updatedUser;
    //   this.cdr.markForCheck();
    // })
    this.user = { ...updatedUser };
    this.cdr.markForCheck();
  }

  onLogout(): void {
    // TODO: Implement logout logic
    console.log('Logging out...');
    // In real app: this.authService.logout().subscribe(...)
  }

  onEditAvatar(): void {
    // TODO: Implement avatar upload logic
    console.log('Editing avatar...');
    // In real app: open file picker and upload
  }

  onRebook(bookingId: string): void {
    // TODO: Navigate to booking page with pre-filled data
    console.log('Rebooking:', bookingId);
    // In real app: this.router.navigate(['/booking'], { queryParams: { bookingId } })
  }

  onViewMoreHistory(): void {
    // TODO: Load more booking history
    console.log('Loading more history...');
  }
}
