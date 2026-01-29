import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ProductsComponent } from '../../../products/pages/products/products.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <h1>Dashboard</h1>
    <p>Bạn đã đăng nhập thành công. Token: {{ token }}</p>
    <button (click)="logout()">Logout</button>
    <hr />
    <h2>Danh sách sản phẩm</h2>
    <app-products></app-products>
  `,
})
export class DashboardComponent {
  token: string | null = null;
  constructor(private authService: AuthService) {
    this.token = this.authService.token ?? null;
  }

  logout() {
    this.authService.logout();
  }
}

