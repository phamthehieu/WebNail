import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { AuthPageLayoutComponent } from '../../../../shared/components/auth-page-layout/auth-page-layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    InputFieldComponent,
    AuthPageLayoutComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  submit() {
    this.authService.login(this.email, this.password);
  }
}
