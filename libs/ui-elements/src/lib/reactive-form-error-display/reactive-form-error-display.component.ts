import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export enum CateredErrors {
  pattern = 'pattern',
  required = 'required',
  minLength = 'minlength',
  hardMaxLength = 'hardmaxlength',
  isDate = 'isdate',
  noFutureDate = 'nofuturedate',
  numeric = 'numeric',
  alphaNumericWithSpaces = 'alphanumericwithspaces',
  alphanumericWithSpacesDotDash = 'alphanumericwithspacesdotdash',
  alphanumeric = 'alphanumeric',
  email = 'email',
  noSpaces = 'nospaces',
  cellphone = 'cellphone',
  unfilledpartnerclaimant = 'unfilledpartnerclaimant',
  currency = 'currency',
  contact_number = 'contact_number',
  charactersWithSpaces = 'charactersWithSpaces',
}

@Component({
  selector: 'flx-reactive-form-error-display',
  templateUrl: './reactive-form-error-display.component.html',
  styleUrls: ['./reactive-form-error-display.component.scss'],
})

/**
 * So this is used as a naive display of errors for a form control, at current it is assuming
 * that it will get a form control passed in to the component
 */
export class ReactiveFormErrorDisplayComponent {
  @Input() control: FormControl;
  @Input() margin: string;
}
