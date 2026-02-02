import { Component } from '@angular/core';
import { HomeServicesComponent } from '../../home/components/home-services.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [HomeServicesComponent],
  templateUrl: './services.component.html',
})
export class ServicesComponent {}

