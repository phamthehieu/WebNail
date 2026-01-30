import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, ThemeToggleComponent, CommonModule],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  private readonly themeService = inject(ThemeService);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);

  readonly theme = this.themeService.theme;
  readonly lang = signal(this.translate.currentLang || this.translate.getDefaultLang() || 'vi');
  readonly isLoginPage = signal(false);

  constructor() {
    this.checkRoute();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });
  }

  private checkRoute() {
    this.isLoginPage.set(this.router.url.includes('/login'));
  }

  setLanguage(lang: 'vi' | 'en') {
    this.translate.use(lang);
    this.lang.set(lang);
    localStorage.setItem('lang', lang);
  }
}
