export interface IControlValueAccessor {
  /**
   * Writes a new value to the element.
   */
  writeValue(obj: any): void;
  /**
   * Registers a callback function that should be called when
   * the control's value changes in the UI.
   */
  registerOnChange(fn: any): void;
  /**
   * Registers a callback function that should be called when
   * the control receives a blur event.
   */
  registerOnTouched(fn: any): void;
  /**
   * This function is called by the forms API when
   * the control status changes to or from "DISABLED".
   */
  setDisabledState?(isDisabled: boolean): void;
}
