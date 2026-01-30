import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthPageLayoutComponent } from '../../../../shared/components/auth-page-layout/auth-page-layout.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    TranslateModule,
    InputFieldComponent,
    AuthPageLayoutComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fullname = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  submit() {
    // TODO: Implement register logic
    console.log('Register:', {
      fullname: this.fullname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }
}
