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
  @Input() customClasses: string = '';

  value: string = '';
  showPassword: boolean = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

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
    this.value = target.value;
    this.onChange(this.value);
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
