import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-first-app');

  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService); // Initialize theme service early

  constructor() {
    this.translate.addLangs(['vi', 'en']);
    this.translate.setDefaultLang('vi');
    const saved = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    const lang = (saved as string | null) ?? browserLang ?? 'vi';
    this.useLanguage(lang);
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
