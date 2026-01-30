import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { AuthPageLayoutComponent } from '../../../../shared/components/auth-page-layout/auth-page-layout.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    InputFieldComponent,
    AuthPageLayoutComponent,
    MatIconModule,
  ],
  templateUrl: './forgot_password.component.html',
})
export class ForgotPasswordComponent {
  email = '';

  constructor(private router: Router) {}

  submit() {
    this.router.navigate(['/auth/confirm-otp']);
  }
}
