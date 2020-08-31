import { ControlValueAccessor } from '@angular/forms';

export abstract class ParentInteractiveAtom implements ControlValueAccessor {
  abstract writeValue(obj: any): void;
  abstract registerOnChange(fn: any): void;
  abstract registerOnTouched(fn: any): void;
  abstract setDisabledState?(isDisabled: boolean): void;
}
