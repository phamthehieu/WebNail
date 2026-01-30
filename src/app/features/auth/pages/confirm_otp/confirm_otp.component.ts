import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LanguageToggleComponent } from '../../../../shared/components/language-toggle/language-toggle.component';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    LanguageToggleComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './confirm_otp.component.html',
  styleUrls: ['./confirm_otp.component.scss'],
})
export class ConfirmOtpComponent implements OnInit, OnDestroy {
  otpDigits: string[] = ['', '', '', '', '', ''];
  countdown: number = 120; // 2 minutes in seconds
  hasError: boolean = false;
  isSubmitting: boolean = false;
  popIndex: number = -1;
  rippleX: number | null = null;
  rippleY: number | null = null;
  private countdownInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;

    // Chỉ cho phép số
    let value = input.value.replace(/[^0-9]/g, '');

    // Giữ lại ký tự cuối cùng nếu user dán/nhiều ký tự
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Cập nhật lại giá trị hiển thị (phòng trường hợp browser chưa sync)
    input.value = value;

    // Cập nhật mảng OTP (clone để đảm bảo change detection)
    const newDigits = [...this.otpDigits];
    newDigits[index] = value;
    this.otpDigits = newDigits;

    // Nếu có ký tự thì chỉ trigger hiệu ứng, KHÔNG auto focus ở đây
    // để tránh case ký tự bị ghi lặp sang ô kế tiếp
    if (value) {
      this.popIndex = index;
      setTimeout(() => {
        this.popIndex = -1;
      }, 300);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    // Người dùng gõ số: tự xử lý, không cho browser tự nhập
    // để tránh ký tự bị đẩy sang ô tiếp theo sau khi auto focus
    if (/^[0-9]$/.test(event.key)) {
      event.preventDefault();

      const value = event.key;

      // Cập nhật input hiện tại
      input.value = value;
      const newDigits = [...this.otpDigits];
      newDigits[index] = value;
      this.otpDigits = newDigits;

      // Hiệu ứng pop
      this.popIndex = index;
      setTimeout(() => {
        this.popIndex = -1;
      }, 300);

      // Auto-focus ô kế tiếp nếu chưa phải ô cuối
      if (index < this.otpDigits.length - 1) {
        setTimeout(() => {
          const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
          if (nextInput) {
            nextInput.focus();
            nextInput.select();
          }
        }, 10);
      }

      return;
    }
    
    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        event.preventDefault();
        const newDigits = [...this.otpDigits];
        newDigits[index - 1] = '';
        this.otpDigits = newDigits;
        
        setTimeout(() => {
          const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
          if (prevInput) {
            prevInput.focus();
          }
        }, 10);
      }
    } else if (event.key.length === 1 && !/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text').replace(/[^0-9]/g, '') || '';
    const digits = pastedData.slice(0, 6).split('');

    const newDigits = [...this.otpDigits];
    digits.forEach((digit, i) => {
      if (i < 6) {
        newDigits[i] = digit;
      }
    });
    this.otpDigits = newDigits;

    const lastFilledIndex = digits.length - 1;
    const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
    setTimeout(() => {
      const nextInput = document.getElementById(`otp-${focusIndex}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }, 10);
  }

  isOtpComplete(): boolean {
    return this.otpDigits.every(digit => digit !== '');
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  onConfirm(event: MouseEvent) {
    if (!this.isOtpComplete() || this.isSubmitting) {
      return;
    }

    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    this.rippleX = event.clientX - rect.left;
    this.rippleY = event.clientY - rect.top;

    setTimeout(() => {
      this.rippleX = null;
      this.rippleY = null;
    }, 600);

    const code = this.otpDigits.join('');
    
    this.isSubmitting = true;
    
    if (code === '123456') {
      console.log('OTP verified successfully');
      this.router.navigate(['/auth/reset-password']);
    } else {
      this.hasError = true;
      setTimeout(() => {
        this.hasError = false;
        this.isSubmitting = false;
        this.otpDigits = ['', '', '', '', '', ''];
        const firstInput = document.getElementById('otp-0') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 500);
    }
  }

  onSubmit() {
  }

  onResend() {
    if (this.countdown > 0) {
      return;
    }

    this.countdown = 120;
    this.startCountdown();

    this.otpDigits = ['', '', '', '', '', ''];
    
    const firstInput = document.getElementById('otp-0') as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
    }

    console.log('Resending OTP...');
  }
}
