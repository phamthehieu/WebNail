import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  ViewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export type TabId = 'personal-info' | 'booking-history';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.scss'],
})
export class ProfileTabsComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) activeTab!: Signal<TabId>;
  @Input() pageEntered!: Signal<boolean>;
  @Output() tabChange = new EventEmitter<TabId>();

  @ViewChild('indicator', { static: false }) indicatorRef!: ElementRef<HTMLDivElement>;

  private isInitialized = false;

  ngOnInit(): void {
    // Track activeTab changes after @Input is set
    effect(() => {
      this.activeTab(); // create reactive dependency
      if (!this.isInitialized || !this.indicatorRef?.nativeElement) return;
      requestAnimationFrame(() => this.updateTabIndicator());
    });
  }

  ngAfterViewInit(): void {
    // Initial positioning after layout/fonts settle
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.updateTabIndicator();
          this.isInitialized = true;
        }, 100);
      });
    });
  }

  switchTab(tabId: TabId): void {
    if (this.activeTab() === tabId) return;
    this.tabChange.emit(tabId);
    if (this.isInitialized && this.indicatorRef?.nativeElement) {
      requestAnimationFrame(() => this.updateTabIndicator());
    }
  }

  private updateTabIndicator(): void {
    if (!this.indicatorRef?.nativeElement) return;

    const activeTabBtn = document.querySelector(`[data-tab="${this.activeTab()}"]`) as HTMLElement | null;
    if (!activeTabBtn) return;

    const parentElement = activeTabBtn.parentElement as HTMLElement | null;
    if (!parentElement) return;

    // Force reflow
    void parentElement.offsetHeight;

    const parentRect = parentElement.getBoundingClientRect();
    const btnRect = activeTabBtn.getBoundingClientRect();

    if (btnRect.width > 0 && parentRect.width > 0) {
      const leftPos = btnRect.left - parentRect.left;
      const indicator = this.indicatorRef.nativeElement;
      indicator.style.width = `${btnRect.width}px`;
      indicator.style.transform = `translateX(${leftPos}px)`;
    } else {
      setTimeout(() => this.updateTabIndicator(), 50);
    }
  }
}

