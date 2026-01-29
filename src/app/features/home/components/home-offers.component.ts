import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-offers',
  standalone: true,
  imports: [MatIconModule, TranslateModule],
  templateUrl: './home-offers.component.html',
})
export class HomeOffersComponent {}

