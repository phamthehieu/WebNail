import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface OfferCardModel {
  id: string;
  image: string;
  discount: string;
  badgeKey?: string;
  badgeClass?: string;
  discountDelay?: string;
}

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [RouterLink, NgClass, TranslateModule],
  templateUrl: './offer-card.component.html',
})
export class OfferCardComponent {
  @Input({ required: true }) offer!: OfferCardModel;

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

