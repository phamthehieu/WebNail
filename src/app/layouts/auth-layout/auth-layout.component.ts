import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, ThemeToggleComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  private readonly themeService = inject(ThemeService);
  private readonly translate = inject(TranslateService);

  readonly theme = this.themeService.theme;
  readonly lang = signal(this.translate.currentLang || this.translate.getDefaultLang() || 'vi');

  setLanguage(lang: 'vi' | 'en') {
    this.translate.use(lang);
    this.lang.set(lang);
    localStorage.setItem('lang', lang);
  }
}
