import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Đăng nhập</h2>
    <form (ngSubmit)="submit()">
      <label>
        Email
        <input type="email" name="email" autocomplete="email" [(ngModel)]="email" />
      </label>

      <label>
        Mật khẩu
        <input type="password" name="password" autocomplete="current-password" [(ngModel)]="password" />
      </label>

      <button type="submit" (click)="submit()">Login</button>
    </form>
  `,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  submit() {
    this.authService.login(this.email, this.password);
  }
}

