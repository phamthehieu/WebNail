import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  avatar: string;
  memberLevel: string;
  joinDate: string;
  bookingCount: number;
  points: number;
  nextLevel: string;
  pointsToNext: number;
  progressPercent: number;
  emailNotifications: boolean;
}

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule, ProgressBarComponent],
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent {
  @Input({ required: true }) user!: UserProfile;
  @Input() pageEntered = signal(false);
  @Output() logout = new EventEmitter<void>();
  @Output() editAvatar = new EventEmitter<void>();

  onLogout(): void {
    this.logout.emit();
  }

  onEditAvatar(): void {
    this.editAvatar.emit();
  }
}
