import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly theme = signal<Theme>('light');

  constructor() {
    const saved = (localStorage.getItem('theme') as Theme | null) ?? 'light';
    this.setTheme(saved);
  }

  setTheme(theme: Theme) {
    this.theme.set(theme);

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }

  toggle() {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  /**
   * Animate: old theme retracts to a corner (like "gom bạt"),
   * then toggle theme underneath.
   */
  toggleWithCurtain(origin?: { x: number; y: number }) {
    const doc = document;
    const body = doc.body;
    if (!body) {
      this.toggle();
      return;
    }

    // Capture current background (old theme) for the curtain.
    const oldBg = getComputedStyle(body).backgroundColor || '#ffffff';

    const curtain = doc.createElement('div');
    curtain.className = 'theme-curtain';
    curtain.style.backgroundColor = oldBg;

    // Default retract corner: top-right. If we have click coords, use them.
    const vw = Math.max(window.innerWidth, 1);
    const vh = Math.max(window.innerHeight, 1);
    const xPct = origin ? `${Math.round((origin.x / vw) * 100)}%` : '100%';
    const yPct = origin ? `${Math.round((origin.y / vh) * 100)}%` : '0%';
    curtain.style.setProperty('--theme-curtain-x', xPct);
    curtain.style.setProperty('--theme-curtain-y', yPct);

    body.appendChild(curtain);

    // Toggle theme under the curtain.
    this.toggle();

    // Start animation next frame so initial styles apply first.
    requestAnimationFrame(() => {
      curtain.classList.add('is-animating');
    });

    const cleanup = () => {
      curtain.removeEventListener('animationend', cleanup);
      curtain.remove();
    };
    curtain.addEventListener('animationend', cleanup);
  }
}

