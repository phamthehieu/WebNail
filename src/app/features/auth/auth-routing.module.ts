import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './pages/forgot_password/forgot_password.component';
import { ConfirmOtpComponent } from './pages/confirm_otp/confirm_otp.component';
import { ResetPasswordComponent } from './pages/reset_password/reset_password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },  
  { path: 'confirm-otp', component: ConfirmOtpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class AuthRoutingModule {

}

