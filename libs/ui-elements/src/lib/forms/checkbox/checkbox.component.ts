import { Component, OnInit, Input, forwardRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'flx-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXCheckboxComponent),
      multi: true,
    },
  ],
})
export class FLXCheckboxComponent implements OnInit, ControlValueAccessor {
  value!: boolean;
  // onChange: (x : booelan ) => void;
  onTouch!: () => void;
  // disabled: boolean;

  private _checked = false;
  private _disabled = false;
  private _tabIndex = -1;
  private _margin = '0.5rem';
  private _padding = '0 0 0 1.4rem';

  public styleClasses: {
    checkedClass?: string;
    disabledClass?: string;
    tabIndexClass?: string;
  } = {};
  // checkedClass = '';
  // disabledClass = '';
  // tabIndexClass = '';

  // Button checked

  @Input()
  set checked(checked: boolean) {
    this._checked = checked;
  }
  get checked() {
    return this._checked;
  }

  @Output()
  checkChanged = new EventEmitter();

  // Checkbox disabled

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  get disabled() {
    return this._disabled;
  }

  //  tabIndex
  @Input()
  set tabIndex(tabIndex: number) {}
  get tabIndex() {
    return this._tabIndex;
  }

  @Input() id!: string;

  @Input()
  set margin(marval: string) {
    this._margin = marval || '1rem';
  }
  get margin() {
    return this._margin;
  }
  @Input()
  set padding(padval: string) {
    this._padding = padval || '0 0 0 1.4rem';
  }
  get padding() {
    return this._padding;
  }
  get arrClasses() {
    return Object.values(this.styleClasses);
  }
  constructor() {}

  ngOnInit() {}

  // onChecked(event) {
  //   console.log(event.target.value);
  //   this.onChange(event.target.value);
  // }

  onChange(value: boolean) {
    this.checked = value;
    this.checkChanged.emit(value);
  }

  writeValue(value: boolean): void {
    this.value = value ? value : false;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
