import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';
import { LanguageToggleComponent } from '../../../shared/components/language-toggle/language-toggle.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [MatIconModule, ThemeToggleComponent, LanguageToggleComponent, TranslateModule],
  templateUrl: './home-nav.component.html',
})
export class HomeNavComponent {
  token: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.token = this.authService.token ?? null;
  }

  onLogin() {
    if (this.token) {
      
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

}

