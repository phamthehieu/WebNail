import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-site-nav',
  standalone: true,
  imports: [
    MatIconModule,
    ThemeToggleComponent,
    LanguageToggleComponent,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './site-nav.component.html',
})
export class SiteNavComponent {
  token: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.token = this.authService.token ?? null;
  }

  onLogin() {
    if (this.token) {
      // TODO: điều hướng sang trang tài khoản khi có token
      return;
    }
    this.router.navigate(['/auth/login']);
  }
}

