import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home-footer',
  standalone: true,
  imports: [MatIconModule, ScrollRevealDirective],
  templateUrl: './home-footer.component.html',
})
export class HomeFooterComponent {}

