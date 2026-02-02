import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SiteNavComponent } from '../../shared/components/site-nav/site-nav.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SiteNavComponent, SiteFooterComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}

