import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [MatIconModule, ThemeToggleComponent, TranslateModule],
  templateUrl: './home-nav.component.html',
})
export class HomeNavComponent {}

