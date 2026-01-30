import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [MatIconModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './home-hero.component.html',
})
export class HomeHeroComponent {}

