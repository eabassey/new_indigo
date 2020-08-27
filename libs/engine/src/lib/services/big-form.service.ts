import { Injectable, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  FormArray
} from '@angular/forms';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { map, tap, debounceTime, take } from 'rxjs/operators';
import {path, flatten, uniq, mergeDeepRight, assocPath} from 'ramda';


type ErrorType = 'required' | 'email' | 'min' | 'max';

@Injectable({providedIn: 'root'})
export class BigFormService {
  bigForm: FormGroup;
  testSub: Subscription;
  private _errorMessages = {};
  bigFormErrors = {};
  storeObject: any;
  storeObjectSubscription: Subscription;
  // constructor(
  //   public fb: FormBuilder,
  //   public formService: DynamicFormService
  // ) {
  //   // this.initForm();
  // }

  // initForm() {
  //   if (!this.bigForm) {
  //     this.bigForm = new FormGroup({});
  //   }
  // }

  initialize(formGroup: FormGroup) {
    this.bigForm = formGroup;
  }


  get errorMessages() {
    return this._errorMessages;
  }

  addErrorMessage(controlName: string, errorType: ErrorType, message: string) {
    this._errorMessages[`${controlName}:${errorType}`] = message;
  }

  addSimpleValueToFormModel(controlName: string, value: any) {
    if (!this.bigForm.get(controlName)) {
      this.bigForm.addControl(controlName, new FormControl(value));
    }
  }


  patchToForm(sourceObservable: Observable<any>, fieldMaps: { [key: string]: string }) {
    return sourceObservable.pipe(
      map(sourceObj => {
        Object.entries(fieldMaps).forEach(([key, value]) => {
          if (key && value) {
            let control = this.getControl(value);
            if (control) {
              control.setValue(this.getSourceValue(sourceObj, key));
            } else {
              this.setControl(value);
              control = this.getControl(value);
              control.setValue(this.getSourceValue(sourceObj, key));
            }
          }
        });
      })
    );
  }

  getSourceValue(source, fieldPath: string) {
    const thePath = fieldPath.split('.');
    return path(thePath, source) || '';
  }


  addControl(controlName: string, control: AbstractControl) {
    if (!this.bigForm.get(controlName)) {
      this.bigForm.addControl(controlName, control);
    }
  }

  getControl(controlPath: string) {
    // this.initForm();
    const path = controlPath.split('.');
    let control = this.bigForm.controls[path[0]];

    if (!control) {
      this.setControl(controlPath);
      control = this.bigForm.controls[path[0]];
    }
    if (path.length > 1) {
      for (let i = 1; i < path.length; i++) {
        control = control.get(path[i]);
      }
    }
    return control;
  }

  setControl(controlPath: string) {
    const path = controlPath.split('.');
    if (path.length === 1) {
      this.bigForm.addControl(path[0], new FormControl(null));
    } else if (path.length === 2) {
      if (this.bigForm.get(path[0])) {
        (<FormGroup>this.bigForm.get(path[0])).addControl(path[1], new FormControl(null));
      } else {
        this.bigForm.addControl(path[0], new FormGroup({ [path[1]]: null }));
      }
    }
  }

  bigFormToStoreMapper(mapper: { [id: string]: string | any[] }) {
    return this.bigForm.valueChanges.pipe(
      debounceTime(800),
      map(formValues => {
        return Object.entries(mapper).reduce((acc, [formPath, storePath]) => {
          const valueExists =
            path(formPath.split('.'), formValues) !== undefined && path(formPath.split('.'), formValues) !== null;
          if (typeof storePath === 'string') {
            return valueExists
              ? mergeDeepRight(acc, assocPath(storePath.split('.'), path(formPath.split('.'), formValues), {}))
              : acc;
          } else if (Array.isArray(storePath) && typeof storePath[0] === 'string') {
            return storePath.reduce((innerAcc, innerStorePath) => {
              const innerObj = valueExists
                ? mergeDeepRight(
                    innerAcc,
                    assocPath(innerStorePath.split('.'), path(formPath.split('.'), formValues), {})
                  )
                : innerAcc;
              return mergeDeepRight(acc, innerObj);
            }, {});
          } else if (Array.isArray(storePath) && typeof storePath[0] === 'function') {
            const [func, pathToStore] = storePath;
            const transformed = func(path(formPath.split('.'), formValues), this.storeObject, this.bigForm.value, this);
            return valueExists ? mergeDeepRight(acc, assocPath(pathToStore.split('.'), transformed, {})) : acc;
          } else if (Array.isArray(storePath) && Array.isArray(storePath[0])) {
            return storePath.reduce((inner1, funcToPathArray) => {
              const [func, pathToStore] = funcToPathArray;
              const transformed = func(
                path(formPath.split('.'), formValues),
                this.storeObject,
                this.bigForm.value,
                this
              );
              const innerObj = valueExists
                ? mergeDeepRight(inner1, assocPath(pathToStore.split('.'), transformed, {}))
                : inner1;
              // const innerObj1 = valueExists
              //   ? R.mergeDeepRight(inner1, R.assocPath(pathToStore.split('.'), R.path(formPath.split('.'), formValues), {}))
              //   : inner1;
              return mergeDeepRight(acc, innerObj);
            }, {});
          }
        }, {});
      })
    );
  }

  allValid() {
    this.bigForm.updateValueAndValidity();
    return this.bigForm.valueChanges.pipe(map(val => this.bigForm.valid));
  }

  fieldsValid(fieldPaths: string[]) {
    const watchedControls = fieldPaths.map(field => this.getControl(field));

    return combineLatest(
      ...watchedControls.map(control => {
        control.updateValueAndValidity();
        return control.valueChanges.pipe(map(val => control.valid));
      })
    ).pipe(map(res => res.every(val => val === true)));
  }

  getFormGroupErrors(form: FormGroup | FormArray) {
    if (Array.isArray(form.controls)) {
      return form.controls
        .map((ctrl, key) => {
          const control = form.get(`${key}`);
          if (control instanceof FormControl) {
            const controlErrors: ValidationErrors = control.errors;
            if (controlErrors) {
              return Object.keys(controlErrors).map(keyError => {
                return `${key}:${keyError}`;
              });
            }
          } else if (control instanceof FormGroup || control instanceof FormArray) {
            return this.getFormGroupErrors(control);
          }
        })
        .filter(val => !!val)
        .map(data => flatten(data));
    } else {
      return Object.keys(form.controls)
        .map(key => {
          const control = form.get(key);
          if (control instanceof FormControl) {
            const controlErrors: ValidationErrors = control.errors;
            if (controlErrors) {
              return Object.keys(controlErrors).map(keyError => {
                return `${key}:${keyError}`;
              });
            }
          } else if (control instanceof FormGroup || control instanceof FormArray) {
            return this.getFormGroupErrors(control);
          }
        })
        .filter(val => !!val)
        .map(data => flatten(data));
    }
  }

  getErrorMessagesForDisplay(errorMessages: { [key: string]: string }) {
    const formGroupErrors = flatten(this.getFormGroupErrors(this.bigForm));
    const errors = formGroupErrors.map(key => {
      return key && errorMessages && errorMessages[key];
    });
    return uniq(flatten(errors.filter(val => !!val)));
  }

  // retrieveErrors$() {
  //   return this.controller.select(getactiveState).pipe(
  //     take(1),
  //     map(item => item && item.flowErrorMessages),
  //     map(errorMessages => {
  //       return this.getErrorMessagesForDisplay(errorMessages);
  //     })
  //   );
  // }



}
