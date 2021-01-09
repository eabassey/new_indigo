import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'flx-yes-no',
  templateUrl: 'yes-no.component.html',
  styleUrls: ['yes-no.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YesNoComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YesNoComponent implements ControlValueAccessor {
  onTouch!: (_?: any) => void;
  onChange!: (_?: any) => void;
  value: boolean = false;
  isDisabled = false;
  touched = false;
  @Output() buttonClick: EventEmitter<boolean> = new EventEmitter();

  writeValue(obj: any): void {
    this.value = obj || false;
    if (this.onChange) {
      this.onChange(obj);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  setValue(v: boolean) {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
    this.value = v;
    this.onChange(v);
    this.buttonClick.emit(v);
  }
}
