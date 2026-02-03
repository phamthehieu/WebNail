import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
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
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SiteNavComponent, SiteFooterComponent],
  templateUrl: './main-layout.component.html',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Giữ container ổn định: chỉ để :leave absolute để không "tụt height"
        query(
          ':leave',
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
        query(':enter', [style({ position: 'relative', width: '100%' })], { optional: true }),
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
  private readonly router = inject(Router);

  readonly routeAnimationKey = signal<string>('');
  readonly showFooter = signal<boolean>(false);

  constructor() {
    // Tránh footer "nhảy" trong lúc route đang dựng / data đang load
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        queueMicrotask(() => this.showFooter.set(true));
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    if (!outlet?.isActivated) return '';
    return outlet.activatedRouteData?.['animation'] ?? outlet.activatedRoute?.routeConfig?.path ?? '';
  }

  onOutletActivate(outlet: RouterOutlet): void {
    // Defer để tránh NG0100 (outlet activate trong cùng change detection pass)
    queueMicrotask(() => this.routeAnimationKey.set(this.prepareRoute(outlet)));
  }

  onOutletDeactivate(): void {
    queueMicrotask(() => this.routeAnimationKey.set(''));
  }
}

