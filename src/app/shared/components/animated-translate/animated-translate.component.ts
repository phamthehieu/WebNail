import {
  Component,
  Input,
  inject,
  signal,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-translate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-translate.component.html',
  styleUrls: ['./animated-translate.component.scss'],
})
export class AnimatedTranslateComponent implements OnInit, OnDestroy {
  private readonly translate = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Translation key (e.g. 'home.nav.home') */
  @Input({ required: true }) key!: string;

  /** Optional params for translate (e.g. { id: 1 }) */
  @Input() params?: Record<string, unknown>;

  /** Optional CSS class for the wrapper (e.g. 'text-sm font-semibold') */
  @Input() class = '';

  readonly currentText = signal('');
  readonly previousText = signal<string | null>(null);
  readonly animating = signal(false);

  private langChangeSub = this.translate.onLangChange?.subscribe(() => {
    this.runSpin();
  });

  ngOnInit() {
    this.currentText.set(this.getTranslation());
  }

  ngOnDestroy() {
    this.langChangeSub?.unsubscribe();
  }

  private getTranslation(): string {
    return this.params
      ? this.translate.instant(this.key, this.params)
      : this.translate.instant(this.key);
  }

  private runSpin() {
    const next = this.getTranslation();
    const current = this.currentText();
    if (next === current) return;

    this.previousText.set(current);
    this.currentText.set(next);
    this.cdr.detectChanges();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.animating.set(true);
      });
    });
  }

  onSpinEnd() {
    if (!this.animating()) return;
    this.animating.set(false);
    this.previousText.set(null);
  }
}
