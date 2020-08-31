import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { returnOrDefault } from '@indigo/utilities';

export enum ERToggleButtonsDirection {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

@Component({
  selector: 'flx-toggle-buttons',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXToggleButtonsComponent),
      multi: true,
    },
  ],
})
/**
 * this component is responsible for rendering an array of options as essentially a flat set of buttons,
 * it will be able to do it in 2 axis vertical and horizontal and will display the options passed into it as plain html
 * it will highlight the selected option but if you give it an unacceptable initial value it will not however break.
 * clicking on an option will be considered both a touch and change event, which will be sent in that order. and should highlight said button
 * there will be a 'selected-option' class placed on the option who's value matches that passed into this component
 *
 *
 * 2019/08/14
 * this will probably end up being the toggle that is found in the app-menu which is using it as the theme picker
 * in this case i will be using it in the search bar
 */
export class FLXToggleButtonsComponent {
  //========================= Variables ==============================
  private _options: Array<string>;
  private _direction: ERToggleButtonsDirection;
  private _disabled: boolean = false;

  selectedOption: string;
  onTouch = (_) => {};
  onChange = (_: string) => {};

  // ========================= Inputs =================================

  @Input() set options(options: Array<string>) {
    this._options = options;
  }

  get options() {
    return returnOrDefault(this._options, []);
  }

  @Input() set direction(direction) {
    this._direction = direction;
  }

  get direction() {
    return returnOrDefault(this._direction, ERToggleButtonsDirection.horizontal);
  }

  //========================== general getters =============================

  get disabled() {
    return this._disabled;
  }

  get containerClass() {
    return {
      [`${this.direction}-toggle`]: true,
    };
  }
  //========================== general methods =============================

  handleClick(option: string) {
    if (this.disabled === true) {
      return;
    }

    this.selectedOption = option;

    if (!!this.onChange) {
      this.onChange(option);
    }

    if (!!this.onTouch) {
      this.onTouch(option);
    }
  }

  //========================== CVA Methods  =============================
  writeValue(obj: string): void {
    this.selectedOption = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
