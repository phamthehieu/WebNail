import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home-offers',
  standalone: true,
  imports: [MatIconModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './home-offers.component.html',
})
export class HomeOffersComponent {}

