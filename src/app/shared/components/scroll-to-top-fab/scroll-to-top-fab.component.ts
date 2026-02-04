import { Component, signal, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-to-top-fab',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './scroll-to-top-fab.component.html',
  styleUrls: ['./scroll-to-top-fab.component.scss'],
})
export class ScrollToTopFabComponent {
  /** Hiện FAB khi cuộn xuống quá số px (mặc định 400) */
  @Input() scrollThreshold = 400;

  protected readonly visible = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.visible.set(window.scrollY > this.scrollThreshold);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
