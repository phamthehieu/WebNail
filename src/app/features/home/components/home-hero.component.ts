import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [MatIconModule, TranslateModule, ScrollRevealDirective, FormsModule, InputFieldComponent],
  templateUrl: './home-hero.component.html',
})
export class HomeHeroComponent {
  heroPhone = '';
}

