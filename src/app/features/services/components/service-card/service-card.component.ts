import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface ServiceCardModel {
  title: string;
  description: string;
  priceLabel: string;
  ratingLabel: string;
  imageSrc: string;
  imageAlt: string;
  badgeText?: string;
  badgeClass?: string;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: ServiceCardModel;
  @Input() viewMode: 'grid' | 'list' = 'grid';
}


