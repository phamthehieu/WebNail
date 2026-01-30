import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

export type ScrollRevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  /** Hướng animation: up | down | left | right | scale | fade */
  @Input() appScrollReveal: ScrollRevealDirection = 'up';

  /** Ngưỡng % element vào viewport mới kích hoạt (0-1). Mặc định 0.15 */
  @Input() scrollRevealThreshold = 0.15;

  /** Chỉ chạy animation một lần (không lặp khi scroll ra vào lại) */
  @Input() scrollRevealOnce = true;

  /** Delay (ms) trước khi bắt đầu animation */
  @Input() scrollRevealDelay = 0;

  /** Stagger index để tạo delay lần lượt (ms * index) */
  @Input() scrollRevealStagger = 0;

  private get host(): HTMLElement {
    return this.el.nativeElement;
  }

  ngOnInit(): void {
    this.host.classList.add('scroll-reveal', `scroll-reveal-${this.appScrollReveal}`);
    if (this.scrollRevealDelay > 0 || this.scrollRevealStagger > 0) {
      const delay = this.scrollRevealDelay + this.scrollRevealStagger;
      this.host.style.animationDelay = `${delay}ms`;
      this.host.style.webkitAnimationDelay = `${delay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          this.host.classList.add('scroll-revealed');
          if (this.scrollRevealOnce && this.observer) {
            this.observer.unobserve(this.host);
          }
        });
      },
      {
        threshold: this.scrollRevealThreshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );
    this.observer.observe(this.host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
