import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { inputType } from './interfaces/main-input.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-input',
  templateUrl: './main-input.component.html',
  styleUrls: ['./main-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MainInputComponent),
      multi: true,
    },
  ],
})
export class MainInputComponent implements ControlValueAccessor {
  constructor(private currencyPipe: CurrencyPipe, private datePipe: DatePipe) {}
  @Input() type: inputType = 'text';
  @Input() placeholder = '';
  @Input() label? = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() showContent = false;
  @Input() currency = false;
  @Input() date = false;

  @Output() keyUp = new EventEmitter<KeyboardEvent>();

  value: string = '';
  showText = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  onHideShowText(): void {
    this.showText = !this.showText;
    this.type = this.showText ? 'text' : 'password';
  }

  onKeyUp(event: KeyboardEvent): void {
    this.keyUp.emit(event);
  }

  changeValue(event: any): void {
    this.onChange(event.target.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
}
