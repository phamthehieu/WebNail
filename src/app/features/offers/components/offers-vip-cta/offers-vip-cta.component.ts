import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-offers-vip-cta',
  standalone: true,
  imports: [RouterLink, MatIconModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './offers-vip-cta.component.html',
})
export class OffersVipCtaComponent {
  tiltTransform = signal<string>('rotateX(0deg) rotateY(0deg)');

  onJoinClick(event: MouseEvent): void {
    this.createRipple(event);
  }

  onLearnMoreClick(event: MouseEvent): void {
    this.createRipple(event);
  }

  onTilt(event: MouseEvent): void {
    const wrapper = event.currentTarget as HTMLElement;
    if (!wrapper) return;
    const cardRect = wrapper.getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const rotateX = ((mouseY - centerY) / (cardRect.height / 2)) * -10;
    const rotateY = ((mouseX - centerX) / (cardRect.width / 2)) * 10;
    this.tiltTransform.set(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }

  resetTilt(): void {
    this.tiltTransform.set('rotateX(0deg) rotateY(0deg)');
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

