import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';
import { LanguageToggleComponent } from '../../../shared/components/language-toggle/language-toggle.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [MatIconModule, ThemeToggleComponent, LanguageToggleComponent, TranslateModule],
  templateUrl: './home-nav.component.html',
})
export class HomeNavComponent {}

