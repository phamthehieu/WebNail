import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { SiteNavComponent } from '../../shared/components/site-nav/site-nav.component';
import { SiteFooterComponent } from '../../shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SiteNavComponent, SiteFooterComponent],
  templateUrl: './main-layout.component.html',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Giữ container ổn định, animate 2 trang chồng lên nhau
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
            }),
          ],
          { optional: true }
        ),
        query(':enter', [style({ opacity: 0, transform: 'translateY(12px)' })], {
          optional: true,
        }),
        group([
          query(
            ':leave',
            [
              animate(
                '180ms cubic-bezier(0.22, 1, 0.36, 1)',
                style({ opacity: 0, transform: 'translateY(-8px)' })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              animate(
                '260ms cubic-bezier(0.22, 1, 0.36, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class MainLayoutComponent {
  // Trả về key của route để animation chạy khi navigate
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] ?? outlet?.activatedRoute?.routeConfig?.path ?? '';
  }
}

