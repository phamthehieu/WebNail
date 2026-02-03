import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../profile-header/profile-header.component';

@Component({
  selector: 'app-personal-info-form',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule, FormsModule],
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent implements OnChanges {
  @Input({ required: true }) user!: UserProfile;
  @Output() save = new EventEmitter<UserProfile>();

  // Local copy for form editing
  formData: UserProfile = { ...this.user };

  ngOnChanges(): void {
    // Update form data when user input changes
    if (this.user) {
      this.formData = { ...this.user };
    }
  }

  onSave(): void {
    this.save.emit({ ...this.formData });
  }

  updateField<K extends keyof UserProfile>(field: K, value: UserProfile[K]): void {
    this.formData[field] = value;
  }
}
