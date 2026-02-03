import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-offers-gift-card',
  standalone: true,
  imports: [RouterLink, MatIconModule, TranslateModule],
  templateUrl: './offers-gift-card.component.html',
})
export class OffersGiftCardComponent {
  onCtaClick(event: MouseEvent): void {
    this.createRipple(event);
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

