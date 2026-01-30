import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page-layout',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LanguageToggleComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './auth-page-layout.component.html',
})
export class AuthPageLayoutComponent {}
