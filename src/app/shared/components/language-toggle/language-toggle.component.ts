import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss'],
})
export class LanguageToggleComponent implements OnInit, OnDestroy {
  private readonly translate = inject(TranslateService);

  private normalizeLang(raw: string): 'vi' | 'en' {
    const lower = (raw ?? '').toLowerCase();
    if (lower.startsWith('en')) return 'en';
    return 'vi';
  }

  readonly currentLang = signal<'vi' | 'en'>(this.normalizeLang(this.translate.currentLang ?? 'vi'));

  readonly isVi = computed(() => this.currentLang() === 'vi');
  readonly isEn = computed(() => this.currentLang() === 'en');

  private sub: Subscription | null = null;

  ngOnInit() {
    this.currentLang.set(this.normalizeLang(this.translate.currentLang ?? 'vi'));
    this.sub = this.translate.onLangChange.subscribe((event) => {
      this.currentLang.set(this.normalizeLang(event.lang));
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  setLang(lang: 'vi' | 'en') {
    const current = this.normalizeLang(this.translate.currentLang ?? 'vi');
    if (current === lang) return;

    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
    this.translate.use(lang).subscribe({
      error: () => {
        console.error('Error switching language');
        this.currentLang.set(current);
        localStorage.setItem('lang', current);
        this.translate.use(current).subscribe({
          error: () => {
            console.error('Error switching language');
          },
        });
      },
    });
  }
}
