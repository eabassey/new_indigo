import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Output } from '@angular/core';

@Component({
  selector: 'flx-rating',
  templateUrl: 'rating.component.html',
  styleUrls: ['rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXRatingComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLXRatingComponent implements ControlValueAccessor {
  @Output() click = new EventEmitter();
  ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  onTouch!: any;
  onChange!: any;
  value!: number;
  isDisabled = false;
  touched = false;

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
  setValue(response: number) {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
    this.click.emit();
    this.value = response;
    this.onChange(response);
    // console.log(this.value);
  }
}
