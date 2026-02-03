import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

export interface BookingHistoryItem {
  id: string;
  date: string;
  month: string;
  year: string;
  service: string;
  time: string;
  location: string;
  stylist?: string;
  status: 'completed' | 'cancelled';
  price: string;
  dateColor: 'rose' | 'indigo' | 'gray' | 'amber';
}

@Component({
  selector: 'app-booking-history-item',
  standalone: true,
  imports: [CommonModule, NgClass, MatIconModule, TranslateModule],
  templateUrl: './booking-history-item.component.html',
  styleUrls: ['./booking-history-item.component.scss'],
})
export class BookingHistoryItemComponent {
  @Input({ required: true }) booking!: BookingHistoryItem;
  @Output() rebook = new EventEmitter<string>();

  onRebook(): void {
    this.rebook.emit(this.booking.id);
  }

  get dateColorClasses(): Record<string, boolean> {
    return {
      'bg-rose-50 text-primary dark:bg-rose-900/20': this.booking.dateColor === 'rose',
      'bg-indigo-50 text-indigo-400 dark:bg-indigo-900/20': this.booking.dateColor === 'indigo',
      'bg-gray-100 text-gray-400 dark:bg-gray-800': this.booking.dateColor === 'gray',
      'bg-amber-50 text-amber-500 dark:bg-amber-900/20': this.booking.dateColor === 'amber',
    };
  }
}
