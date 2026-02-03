import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

export interface OffersFilterPill {
  id: string;
  labelKey: string;
}

@Component({
  selector: 'app-offers-filter-pills',
  standalone: true,
  imports: [TranslateModule, ScrollRevealDirective],
  templateUrl: './offers-filter-pills.component.html',
})
export class OffersFilterPillsComponent {
  @Input({ required: true }) filters: OffersFilterPill[] = [];
  @Input({ required: true }) activeId = 'all';

  @Output() filterChange = new EventEmitter<string>();

  onFilterClick(event: MouseEvent, filterId: string): void {
    this.createRipple(event);
    this.filterChange.emit(filterId);
  }

  private createRipple(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    if (!button) return;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    const existing = button.querySelector('.ripple');
    if (existing) existing.remove();
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  }
}

