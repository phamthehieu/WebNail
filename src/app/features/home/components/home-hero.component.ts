import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [MatIconModule, TranslateModule],
  templateUrl: './home-hero.component.html',
})
export class HomeHeroComponent {}

