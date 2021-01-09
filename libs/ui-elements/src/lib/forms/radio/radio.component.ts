import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'flx-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXRadioComponent),
      multi: true,
    },
  ],
})
export class FLXRadioComponent implements OnInit, ControlValueAccessor {
  value!: string;
  onChange!: () => void;
  onTouch!: () => void;

  private _checked = false;
  private _disabled = false;
  private _stacked = '';

  checkedClass = '';
  disabledClass = '';
  stackedClass = '';

  // Radio checked

  @Input()
  set checked(checked: boolean) {
    this._checked = checked;
  }
  get checked() {
    return this._checked;
  }

  // Radio disabled

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  get disabled() {
    return this._disabled;
  }

  @Input() id!: string;
  @Input() name!: string;

  // Radio Stacked

  @Input()
  set stacked(stacked: string) {
    switch (stacked) {
      case 'default':
        this.stackedClass = '.flx-stacked-default';
        break;
      case 'inline':
        this.stackedClass = '.flx-stacked-inline';
        break;
      default:
        this.stackedClass = '';
    }
    this._stacked = stacked;
  }
  get stacked() {
    return this._stacked;
  }

  constructor() {}

  ngOnInit() {}

  writeValue(value: any): void {
    this.value = value ? value : '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
