import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-offers-hero',
  standalone: true,
  imports: [TranslateModule, ScrollRevealDirective],
  templateUrl: './offers-hero.component.html',
})
export class OffersHeroComponent {}

