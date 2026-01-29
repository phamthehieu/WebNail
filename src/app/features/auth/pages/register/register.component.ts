import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
    <h2>Đăng ký</h2>
    <form>
      <label>
        Email
        <input type="email" name="email" autocomplete="email" />
      </label>

      <label>
        Mật khẩu
        <input type="password" name="password" autocomplete="new-password" />
      </label>

      <button type="submit">Register</button>
    </form>
  `,
})
export class RegisterComponent {}

