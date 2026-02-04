import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, TranslateModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() placeholderKey: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() autocomplete: string = '';
  @Input() leftIcon: string = '';
  @Input() rightIcon: string = '';
  @Input() showPasswordToggle: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  /** Bật sanitize chặn HTML/script khi dán và nhập (mặc định true) */
  @Input() sanitizeInput: boolean = true;
  @Input() customClasses: string = '';

  value: string = '';
  showPassword: boolean = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  /** Loại bỏ nội dung nguy hiểm: thẻ HTML, protocol script, event handler, ký tự điều khiển */
  private sanitize(raw: string): string {
    if (!raw || !this.sanitizeInput) return raw;
    let s = raw;
    // Null byte và ký tự điều khiển
    s = s.replace(/\0/g, '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    // Thẻ HTML (script, style, iframe, object, ... và mọi <...>)
    s = s.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    s = s.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    s = s.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
    s = s.replace(/<[^>]+>/g, '');
    // Protocol nguy hiểm (javascript:, data:, vbscript:)
    s = s.replace(/\s*javascript\s*:/gi, '');
    s = s.replace(/\s*data\s*:\s*text\/html[^,\s]*/gi, '');
    s = s.replace(/\s*vbscript\s*:/gi, '');
    // Event handler onxxx="..." hoặc onxxx='...'
    s = s.replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, '');
    s = s.replace(/\bon\w+\s*=\s*[^\s>]*/gi, '');
    return s.trimStart();
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const raw = target.value;
    const safe = this.sanitizeInput ? this.sanitize(raw) : raw;
    if (safe !== raw) target.value = safe;
    this.value = safe;
    this.onChange(safe);
  }

  onPaste(event: ClipboardEvent): void {
    if (!this.sanitizeInput) return;
    const pasted = event.clipboardData?.getData('text');
    if (pasted == null) return;
    const safe = this.sanitize(pasted);
    if (safe === pasted) return;
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const start = target.selectionStart ?? 0;
    const end = target.selectionEnd ?? 0;
    const before = this.value.slice(0, start);
    const after = this.value.slice(end);
    this.value = before + safe + after;
    this.onChange(this.value);
    requestAnimationFrame(() => {
      target.value = this.value;
      const pos = start + safe.length;
      target.setSelectionRange(pos, pos);
    });
  }

  onBlur(): void {
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getInputType(): string {
    if (this.showPasswordToggle && this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  getPlaceholder(): string {
    return this.placeholderKey ? '' : this.placeholder;
  }
}
