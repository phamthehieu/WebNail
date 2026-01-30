import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { LanguageToggleComponent } from '../../../../shared/components/language-toggle/language-toggle.component';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    MatIconModule,
    LanguageToggleComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(private authService: AuthService) {}

  submit() {
    this.authService.login(this.email, this.password);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

