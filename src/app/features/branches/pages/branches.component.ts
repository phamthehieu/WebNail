import { Component } from '@angular/core';
import { HomeLocationsComponent } from '../../home/components/home-locations.component';

@Component({
  selector: 'app-branches-page',
  standalone: true,
  imports: [HomeLocationsComponent],
  templateUrl: './branches.component.html',
})
export class BranchesComponent {}

