import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

export type BranchStatus = 'open' | 'closed';

export interface BranchCardModel {
  title: string;
  badgeText: string;
  badgeClass: string;

  address: string;

  status: BranchStatus;
  statusText: string;
  statusMeta: string;

  imageSrc?: string;
  imageAlt?: string;
  fallbackIcon?: string;
  fallbackBgClass?: string;
  fallbackIconClass?: string;
}

@Component({
  selector: 'app-branch-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, ScrollRevealDirective],
  templateUrl: './branch-card.component.html',
})
export class BranchCardComponent {
  @Input({ required: true }) branch!: BranchCardModel;
  @Input() revealDelay = 0;
}

