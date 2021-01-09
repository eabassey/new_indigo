import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { toInteger, toFloat } from './conversions';

export function CheckAllKeysProviedExistInObject(
  obj: {[id: string]: any} = {},
  keyList: Array<string>,
  exactCheck = false,
  noNulls = false
) {
  const existingKeys = Object.keys(obj);

  const checkMap = new Set();
  // build the set and check that there is none missing
  for (const key of keyList) {
    checkMap.add(key);
    if ((obj[key] === null && noNulls === true) || obj[key] === undefined) {
      // console.log(`key: ${key} in the object is not defined or is null`);
      return false;
    }
  }

  if (exactCheck === false) {
    // console.log(`exactCheck is not true so returning`);
    return true;
  }

  for (let existingKey of existingKeys) {
    if (checkMap.has(existingKey) === false) {
      // console.log(`${existingKey} does not exist in check map`);
      return false;
    }
  }
  return true;
}

/**
 * function to check if a value is a number
 * @param value value to check if it is a floating point number or an integer
 */
export const isNumber = (value: any): value is number => {
  return !isNaN(toInteger(value)) || !isNaN(toFloat(value));
};

/**
 * function to check if a number is an integer
 */
export const isInteger = (value: any): value is number => {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

export const isNull = (obj: object): boolean => obj === null;
export const isNullOrUndefined = (obj: object): boolean => isNull(obj) || isUndefined(obj);
export const isUndefined = (obj: object): boolean => obj === undefined;

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check, will cast to a string
 */
export const checkAlphaNumeric = (val: any) => (val + '').match(/\W/) !== null;

/**
 * ***
 * this function checks that nothing matches the pattern
 * @param val value to check, will cast to a string
 * @param pattern Regex pattern to match against
 * @returns true when anything matches
 * @returns false when nothing matches
 */
export const checkExclusionPattern = (val: any, pattern: RegExp) => pattern.test(`${val}`);

/**
 * ***
 * this function checks that something does match the pattern
 * @param val value to check, will cast to a string
 * @param pattern Regex pattern to match against
 * @returns true when nothing matches
 * @returns false when there is something that matchs
 */
export const checkInclusionPattern = (val: any, pattern: RegExp) => !pattern.test(`${val}`);

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check, will cast to a string
 */
export const checkAlphaNumericWithSpacesDot = (val: any) => (val + '').match(/[^\w .]+/) !== null;

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check, will cast to a string
 */
export const checkAlphaNumericWithSpacesDotDash = (val: any) => (val + '').match(/[^\w .-]+/) !== null;

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check, will cast to a string
 */
export const checkAlphaNumericWithSpaces = (val: any) => (val + '').match(/[^\w ]+/) !== null;
/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check, will cast to a string
 */
export const checkCharactersWithSpaces = (val: any) => (val + '').match(/^[a-zA-Z\s]*$/) !== null;

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check, will cast to a string
 */
export const checkCellphone = (val: any) => {
  if ((val + '').match(/[^0-9-()+ ]/) === null) {
    const res = (val + '').match(/[0-9]/g);
    return res === null || res.length < 6 ? true : false;
  } else {
    return true;
  }
};

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check,
 */
export const checkNoSpaces = (val: any) => (val + '').match(/\s/g) !== null;

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check,
 */
export const checkDate = (val: any) => !moment(val).isValid();

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val value to check, will cast to a string
 */
export const checkFutureDate = (val: any) => moment(val).isAfter(moment.now());

/**
 * these functions return false when there is no error and true when there is
 *
 * @param value
 */
export const checkNumber = (val: any) => (val + '').match(/\D+/) !== null;

/**
 * Checks that Value is a currency shape
 * ie starts with n digits , with an optional '.'and up to two numbers
 * these functions return false when there is no error and true when there is
 *
 * @param value
 */
export const checkCurrency = (val: any) => !RegExp(/^\d*(\.\d{0,2})?$/).test(val + '');

/**
 *
 * these functions return false when there is no error and true when there is
 * @param val
 */
export const checkEmail = (val: any) =>
  (val + '').match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
  ) === null;

/**
 * returns true if a value is null or undefined
 * @param val value to check
 */
export const checkNullUndefined = (val: any, emptyIsNull = false) => {
  // if (val === null || val === undefined) {
  //   return true;
  // }
  // if (typeof val === 'object') {
  // }
  // console.log(val);
  // return val === null || val === undefined || val === '' || val === [] || val === {};
  switch (true) {
    case val === null || val === undefined: {
      return true;
    }

    case typeof val === 'string': {
      if (emptyIsNull) {
        if (val === '') {
          return true;
        }
      }
      return /null|undefined/gi.test(val);
    }
    case typeof val === 'object' && emptyIsNull: {
      // console.log(val);
      return Object.entries(val).length > 0;
    }
    // array or entries or string
    default: {
      return false;
    }
  }
  // return  || Object.keys(val).length === 0;
};

/**
 * used to check the number of keys inside an object
 * these functions return false when there is no error and true when there is
 * @param val the object to check the keys
 * @param len the length it needs to be greater than
 * @warn len is exclusive
 */
export const checkKeys = (val: object, len: number) => (Object.keys(val).length > len ? false : true);

/**
 * used to check the length of a string
 * these functions return false when there is no error and true when there is
 * @param val the value to check
 * @param len the number of characters that val needs to have more than
 */
export const checkLength = (val: string, len: number) => ((val + '').length > len ? false : true);

/**
 * will return true if null undefined or empty is found
 */
export const checkForNullUndefinedOrEmptyInObject = (val: any) => {
  // for each key in the object
  return Object.keys(val).reduce((retVal, key) => {
    // check each defined key for null blank 0 undefined or empty if so return true else return prev
    return val[key] === null || val[key] === undefined || val[key] === '' || val[key] === 0 ? true : retVal;
  }, false);
};

export class CustomValidators {
  /**
   * Validator to log out the value of a control
   * Use this for debugging
   */
  static logValue = (control: AbstractControl): null => {
    // console.log({ control, value: control.value });
    return null;
  };

  /**
   * used to check a value is a valid date
   */
  static isDate = (control: AbstractControl): ValidationErrors | null =>
    !checkDate(control.value) ? null : { isdate: true };

  /**
   * this function is used to make a validation lookup on a control cause another control to calculate its value and validity
   * in the same way that focusing on the sibling controls bound control will, hence the name poke
   * @emits Validator Function
   * @param siblingName This is  the name of the sibling control to poke
   */
  // static pokeSibling = (siblingName: string) => {
  //   return (control: AbstractControl): null => {
  //     if (control.parent) {
  //       const sibling: AbstractControl = control.parent.controls[siblingName];
  //       if (sibling) {
  //         sibling.markAsDirty({ onlySelf: true });
  //         sibling.markAsTouched({ onlySelf: true });
  //         sibling.updateValueAndValidity({ onlySelf: true });
  //         return null;
  //       }
  //       return null;
  //     }
  //     return null;
  //   };
  // };

  // Aleks TODO: add generic---->
  // static cleanSiblingOnValue = (valueToCheck: any, ...siblingNames: string[]) => {
  //   return (control: AbstractControl): null => {
  //     if (control.parent) {
  //       if (control.value === valueToCheck) {
  //         for (const sibName of siblingNames) {
  //           if (!!sibName) {
  //             const sibling: AbstractControl = control.parent.controls[sibName];
  //             if (sibling && sibling.value !== null) {
  //               // console.log({ sibling });
  //               sibling.setValue(null);
  //             }
  //           }
  //         }
  //       }
  //       return null;
  //     }
  //     return null;
  //   };
  // };

  /**
   * used to check a date is not in the future
   */
  static noFutureDate = (control: AbstractControl): ValidationErrors | null => {
    if (!checkFutureDate(control.value)) {
      return null;
    } else {
      control.setValue('');
      return { nofuturedate: true };
    }
  };

  /**
   * This is a factory function used to create pattern based validators with dynamic errors that
   * can be used to dsplay custom error classes for display or validation
   * this method can do an inclusive or exclusive match
   * when true error will be thrown if nothing matches
   * when false error will be thrown if there are any matches
   * @param pattern the regex pattern that will be used for the mathc
   * @param errorName the name of the error to be used as the key for the error object that is output by this function
   * @default 'pattern'
   * @param type the type of pattern match to do, true for inclusive false for exclusive
   * @default true
   */
  static pattern = (pattern: RegExp, errorName: string = 'pattern', type = true) => (
    control: AbstractControl
  ): ValidationErrors | null =>
    type
      ? checkInclusionPattern(control.value, pattern)
        ? {
            [errorName]: true
          }
        : null
      : checkExclusionPattern(control.value, pattern)
      ? {
          [errorName]: true
        }
      : null;
  /**
   * used to check a value contains onlu numeric characters only
   * this will also throw an error on whitespace
   */
  static numeric = (control: AbstractControl): ValidationErrors | null =>
    !checkNumber(control.value) ? null : { numeric: true };

  /**
   * used to check a value will never be longer than a given number of characters.
   * will delete extra characters from the control , hence the term hard
   */
  static hardMaxLength = (len: number) => (control: AbstractControl): ValidationErrors | null => {
    if ((control.value + '').length > len) {
      control.setValue((control.value + '').slice(0, len));
      return { hardmaxlength: { len } };
    } else {
      return null;
    }
  };

  static selectMinItemLimit = (lowerItemCountLimit: number) => (control: AbstractControl): ValidationErrors | null => {
    if (control.value.length > lowerItemCountLimit) {
      return null;
    } else {
      return { selectmaxitemlimit: { min: lowerItemCountLimit, current: control.value.length } };
    }
  };
  static selectMaxItemLimit = (upperItemCountLimit: number) => (control: AbstractControl): ValidationErrors | null => {
    if (upperItemCountLimit !== -1 && control.value.length < upperItemCountLimit) {
      return null;
    } else {
      return { selectmaxitemlimit: { max: upperItemCountLimit, current: control.value.length } };
    }
  };

  static selectItem = () => (control: AbstractControl): ValidationErrors | null => {
    if ((control.value + '').length === 0) {
      return { selectItem: 'Select Item' };
    } else {
      return null;
    }
  };

  static ignoreValidation = () => (control: AbstractControl): ValidationErrors | null => {
    return null;
  };

  /**
   * used to check a value contains onlu numeric characters only
   * this will also throw an error on whitespace
   */
  static currency = (control: AbstractControl): ValidationErrors | null =>
    !checkCurrency(control.value) ? null : { currency: true };

  /**
   * used to check that  a value has only alpha numeric charatcers or _
   * this will also throw an error on whitespace
   */
  static alphaNumeric = (control: AbstractControl): ValidationErrors | null =>
    !checkAlphaNumeric(control.value) ? null : { alphanumeric: true };
  // {
  //   console.log(control);
  //   console.log(checkAlphaNumeric(control.value));
  //   return !checkAlphaNumeric(control.value) ? null : { alphanumeric: true };
  // };

  /**
   * used to check that a value only has either alpha numeric characters or spaces or a .
   */
  static alphaNumericWithSpacesDot = (control: AbstractControl): ValidationErrors | null =>
    !checkAlphaNumericWithSpacesDot(control.value) ? null : { alphanumericwithspacesdot: true };

  /**
   * used to check that a value only has either alpha numeric characters or spaces or a .
   */
  static alphaNumericWithSpacesDotDash = (control: AbstractControl): ValidationErrors | null =>
    !checkAlphaNumericWithSpacesDotDash(control.value) ? null : { alphanumericwithspacesdotdash: true };

  /**
   * used to check that a value only has either alpha numeric characters or spaces
   */
  static alphaNumericWithSpaces = (control: AbstractControl): ValidationErrors | null =>
    !checkAlphaNumericWithSpaces(control.value) ? null : { alphanumericwithspaces: true };
  /**
   * used to check that a value only has either characters or spaces
   */
  static charactersWithSpaces = (control: AbstractControl): ValidationErrors | null =>
    checkCharactersWithSpaces(control.value) ? null : { charactersWithSpaces: true };

  /**
   * will not allow anything other than 0-9-()+' '
   * will force 6 digits
   */
  static cellphone = (control: AbstractControl): ValidationErrors | null => {
    if ((control.value + '').match(/[^0-9-()+ ]/) === null) {
      const res = (control.value + '').match(/[0-9]/g);
      return res === null || res.length < 10 ? { cellphone: { issue: 'digits' } } : null;
    } else {
      return { cellphone: { issue: 'disallowed_characters_found' } };
    }
  };
  static contact_number = (control: AbstractControl): ValidationErrors | null => {
    if ((control.value + '').match(/[^0-9-()+ ]/) === null) {
      const res = (control.value + '').match(/[0-9]/g);
      return res === null || res.length < 10 ? { contact_number: { issue: 'digits' } } : null;
    } else {
      return { contact_number: { issue: 'disallowed_characters_found' } };
    }
  };

  /**
   * used the check that there is no whitespace in a particular value
   */
  static noSpaces = (control: AbstractControl): ValidationErrors | null =>
    !checkNoSpaces(control.value) ? null : { nospaces: true };

  static noEndingSpaces = (control: AbstractControl): ValidationErrors | null =>
    !checkExclusionPattern(control.value, /\s+$/g) ? null : { noendingspaces: false };

  /**
   * used to mark a control as pristine once it has been emptied
   */
  static cleanOnEmpty = (control: AbstractControl): ValidationErrors | null => {
    if (checkNullUndefined(control.value) || control.value === '') {
      control.markAsPristine({ onlySelf: true });
      return null;
    } else {
      return null;
    }
  };

  static email = (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== null) {
      if (
        control.value.toLowerCase() === 'na' ||
        control.value.toLowerCase() === 'n/a' ||
        control.value.toLowerCase() === 'n\\a'
      ) {
        return null;
      } else {
        if (checkEmail(control.value)) {
          return { email: false };
        } else {
          return null;
        }
      }
    } else {
      return { email: false };
    }
  };

  static contains = (vals: any[]) => {
    //checks against strings
    return (control: AbstractControl): ValidationErrors | null => {
      return vals.indexOf(control.value) !== -1 ? null : { contains: true };
    };
  };
}
