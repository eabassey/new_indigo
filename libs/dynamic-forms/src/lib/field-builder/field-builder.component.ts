import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Field } from '../models/field';

@Component({
  selector: 'field-builder',
  templateUrl: 'field-builder.component.html'
})
export class FieldBuilderComponent implements OnInit, OnChanges {
  @Input() field:Field;
  @Input() form:FormGroup;
  errorMessages = {};

  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get fieldErrors() { return this.form.controls[this.field.name].errors; }
  get errorKeys() { console.log({errors: this.errorMessages}); return Object.keys(this.errorMessages); }
  // get showRequiredSign() { return this.field.validators.map(val => val.type).some(type => type === 'required')}
  isHidden$: Observable<boolean>;
  isDisabled$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
    const validators = this.field.validators ? this.field.validators.map(val => this.handleValidator(val)) : [];
    this.form.controls[this.field.name].setValidators(validators);
    this.isHidden$ = this.form.valueChanges.pipe(map(val => this.field.hidden || this.isHiddenWhen()));
    this.isDisabled$ = this.form.valueChanges.pipe(map(val => this.field.disabled || this.isDisabledWhen()));

  }

  ngOnChanges() {
  }


  isHiddenWhen() {
    if (!!this.field.hiddenWhen) {
     return this.field.hiddenWhen.map(cond => {
        const fieldControl = this.form.controls[cond.field];
        switch (cond.operator) {
          case 'is': {
            if (cond.value === 'valid') {
             return fieldControl.valid ? true : false;
            } else if (cond.value === 'invalid') {
              return fieldControl.invalid ? true : false;
            }
            return false;
          }
          case 'equals': {
            return fieldControl.value === cond.value ? true : false;
          }
          case 'contains': {
            return fieldControl.value.includes(cond.value) ? true : false;
          }

        }
      }).includes(true);
    }

  }

  isDisabledWhen() {
    if (!!this.field.disableWhen) {
     return this.field.disableWhen.map(cond => {
        const fieldControl = this.form.controls[cond.field];
        switch (cond.operator) {
          case 'is': {
            if (cond.value === 'valid') {
             return fieldControl.valid ? true : false;
            } else if (cond.value === 'invalid') {
              return fieldControl.invalid ? true : false;
            }
            return false;
          }
          case 'equals': {
            return fieldControl.value === cond.value ? true : false;
          }
          case 'contains': {
            return fieldControl.value.includes(cond.value) ? true : false;
          }

        }
      }).includes(true);
    }

  }



  handleValidator(validator) {
    switch (validator.type) {
      case 'required': {
        this.errorMessages['required'] = validator.errorMessage || 'This field is required';
        return Validators.required;
      }
      case 'minlength': {
        this.errorMessages['minlength'] = validator.errorMessage || `This field needs a minimum length of ${validator.arg}`;
        return Validators.minLength(validator.arg);
      }
      case 'maxlength': {
        this.errorMessages['maxlength'] = validator.errorMessage || `This field needs a maximum length of ${validator.arg}`;
        return Validators.maxLength(validator.arg);
      }
      case 'email': {
        this.errorMessages['email'] = validator.errorMessage || 'This field has to be a valid email address';
        return Validators.email;
      }
    }
  }

}
