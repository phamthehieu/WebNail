import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [MatIconModule, TranslateModule, ScrollRevealDirective],
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {}

