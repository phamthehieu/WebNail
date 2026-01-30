import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-home-services',
  standalone: true,
  imports: [TranslateModule, ScrollRevealDirective],
  templateUrl: './home-services.component.html',
})
export class HomeServicesComponent {}

