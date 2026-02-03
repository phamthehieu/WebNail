import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface StaffOption {
  id: string;
  name: string;
  avatarUrl: string;
  isRandom?: boolean;
}

@Component({
  selector: 'app-staff-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-picker.component.html',
  styleUrl: './staff-picker.component.scss',
})
export class StaffPickerComponent {
  @Input() staffList: StaffOption[] = [];
  @Input() selectedStaffId: string | null = null;
  @Output() selectedStaffIdChange = new EventEmitter<string>();

  selectStaff(id: string): void {
    this.selectedStaffIdChange.emit(id);
  }
}
