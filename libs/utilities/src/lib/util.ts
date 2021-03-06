import * as moment from 'moment';
import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as _conv from './conversions';
import { isNullOrUndefined, checkNullUndefined } from './validation';
import { Store } from '@ngrx/store';
import { take, pluck, map } from 'rxjs/operators';
/**
 * helper method to wrap basic getter/ defaulting functionality
 * @param value value to check if null or undefined, will return if not
 * @param def value to return if value param is null, can be null too
 */
export function returnOrDefault<T = any>(value: T, def: T) {
  return !checkNullUndefined(value) ? value : def;
}

// export function CheckAllKeysProviedExistInObject(obj: object, keyList: Array<string>, exactCheck = false, noNulls = false) {
//   let existingKeys = Object.keys(obj);

//   let checkMap = new Set();
//   // build the set and check that there is none missing
//   for (let key of keyList) {
//     checkMap.add(key);
//     if ((obj[key] === null && noNulls === true) || obj[key] === undefined) {
//       // console.log(`key: ${key} in the object is not defined or is null`);
//       return false;
//     }
//   }

//   if (exactCheck === false) {
//     // console.log(`exactCheck is not true so returning`);
//     return true;
//   }

//   for (let existingKey of existingKeys) {
//     if (checkMap.has(existingKey) === false) {
//       // console.log(`${existingKey} does not exist in check map`);
//       return false;
//     }
//   }
//   return true;
// }

export function b64toBlob(b64Data: any, contentType = '', sliceSize = 512): Blob {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'application/pdf' });
  return blob;
}

export function stringToBoolean(val: any) {
  if (typeof val === 'boolean') {
    return val;
  } else if (typeof val === 'string') {
    switch (val.toLowerCase()) {
      case 'false':
      case 'no':
      case '0':
      case '':
        return false;
      default:
        return true;
    }
  } else {
    return false;
  }
}

/**
 * a simple function to simplify defaulting out values
 * @param reference the thing to check if it exists
 * @param def value to replace it with if it does not
 */
export function setIfNot<T>(reference: T, def: T) {
  if (checkNullUndefined(reference) === true) {
    reference = def;
  }
}



// let x = { a: 1, b: 2, c: 3, d: 4 };

/**
 * helper function for unsubscribing subscriptions if they are not already closed
 * @param obs Subscription to be checked and cleaned
 */
export function cleanUpSub(obs: Subscription) {
  if (obs && !obs.closed) {
    obs.unsubscribe();
  }
}

// /**
//  * function to check if a value is a number
//  * @param value value to check if it is a floating point number or an integer
//  */
// export const isNumber = (value: any): value is number => {
//   return !isNaN(_conv.toInteger(value)) || !isNaN(_conv.toFloat(value));
// };

// /**
//  * function to check if a number is an integer
//  */
// export const isInteger = (value: any): value is number => {
//   return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
// };

/**
 * will copy the properties out of the passed object ,  prop by prop and write it into a new object
 * note this method implements a shallow copy
 * @param obj object to copy out
 */
export function fullShallowCopy<T>(obj: T & object): T {
  const out: Partial<T> = {};
  for (const key in obj) {
    out[key] = obj[key];
  }
  return <T>out;
}

export function fullDeepCopy<T>(obj: T & object): T {
  // will use recursion to create a deep copy of the given object recursing based on the subset being an object or array
  const out: Partial<T> = {};
  for (const key in obj) {
    switch (typeof obj[key]) {
      case 'object': {
        let working: unknown = obj[key];
        // the unknown conversion is to tell ts that i am checking the type for this
        if (Array.isArray(working) === true) {
          //  if its an array use an array slice method , might consider creating a new array in a v2 of this
          //  function
          out[key] = <any>(<Array<any>>working).slice();
        } else {
          // else recurse with this copy
          out[key] = <any>fullDeepCopy(<object>working);
        }
        break;
      }
      //  by default we can just copy it over
      default: {
        out[key] = obj[key];
      }
    }
  }
  /**
   * and now out has been populated so we can return it
   * and because we have just finished copying over all properties 1 by 1 we are garunteed that this
   * is in fact T as opposed to just a partial of T
   */
  return <T>out;
}

export function fullVeryDeepCopy<T>(obj: T & object): T {
  throw 'no implemented';

  return obj;
}
/**
 * much as the above only copying everything in a way that forces it to break all references
 * mostly as an experiment but anyways
 * this will have a huge performance impact so be very careful when using this method
 */
export function fullyReferentiallyBreakingCopy<T = any>(obj: T): T {
  throw 'not implemented';
  return obj;
}


// export const isNull = (obj: object): boolean => obj === null;
// export const isNullOrUndefined = (obj: object): boolean => isNull(obj) || isUndefined(obj);
// export const isUndefined = (obj: object): boolean => obj === undefined;

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val value to check, will cast to a string
//  */
// export const checkAlphaNumeric = (val) => (val + '').match(/\W/) !== null;

// /**
//  * ***
//  * this function checks that nothing matches the pattern
//  * @param val value to check, will cast to a string
//  * @param pattern Regex pattern to match against
//  * @returns true when anything matches
//  * @returns false when nothing matches
//  */
// export const checkExclusionPattern = (val, pattern: RegExp) => pattern.test(`${val}`);

// /**
//  * ***
//  * this function checks that something does match the pattern
//  * @param val value to check, will cast to a string
//  * @param pattern Regex pattern to match against
//  * @returns true when nothing matches
//  * @returns false when there is something that matchs
//  */
// export const checkInclusionPattern = (val, pattern: RegExp) => !pattern.test(`${val}`);

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val value to check, will cast to a string
//  */
// export const checkAlphaNumericWithSpacesDot = (val) => (val + '').match(/[^\w .]+/) !== null;

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val value to check, will cast to a string
//  */
// export const checkAlphaNumericWithSpacesDotDash = (val) => (val + '').match(/[^\w .-]+/) !== null;

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val value to check, will cast to a string
//  */
// export const checkAlphaNumericWithSpaces = (val) => (val + '').match(/[^\w ]+/) !== null;

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val value to check, will cast to a string
//  */
// export const checkCellphone = (val) => {
//   if ((val + '').match(/[^0-9-()+ ]/) === null) {
//     const res = (val + '').match(/[0-9]/g);
//     return res === null || res.length < 6 ? true : false;
//   } else {
//     return true;
//   }
// };

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val value to check,
//  */
// export const checkNoSpaces = (val) => (val + '').match(/\s/g) !== null;

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val value to check,
//  */
// export const checkDate = (val) => !moment(val).isValid();

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val value to check, will cast to a string
//  */
// export const checkFutureDate = (val) => moment(val).isAfter(moment.now());

// /**
//  * these functions return false when there is no error and true when there is
//  *
//  * @param value
//  */
// export const checkNumber = (val) => (val + '').match(/\D+/) !== null;

// /**
//  * Checks that Value is a currency shape
//  * ie starts with n digits , with an optional '.'and up to two numbers
//  * these functions return false when there is no error and true when there is
//  *
//  * @param value
//  */
// export const checkCurrency = (val) => !RegExp(/^\d*(\.\d{0,2})?$/).test(val + '');

// /**
//  *
//  * these functions return false when there is no error and true when there is
//  * @param val
//  */
// export const checkEmail = (val) =>
//   (val + '').match(
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
//   ) === null;

// /**
//  * returns true if a value is null or undefined
//  * @param val value to check
//  */
// export const checkNullUndefined = (val: any, emptyIsNull = false) => {
//   // if (val === null || val === undefined) {
//   //   return true;
//   // }
//   // if (typeof val === 'object') {
//   // }
//   // console.log(val);
//   // return val === null || val === undefined || val === '' || val === [] || val === {};
//   switch (true) {
//     case val === null || val === undefined: {
//       return true;
//     }

//     case typeof val === 'string': {
//       if (emptyIsNull) {
//         if (val === '') {
//           return true;
//         }
//       }
//       return /null|undefined/gi.test(val);
//     }
//     case typeof val === 'object' && emptyIsNull: {
//       // console.log(val);
//       return Object.entries(val).length > 0;
//     }
//     // array or entries or string
//     default: {
//       return false;
//     }
//   }
//   // return  || Object.keys(val).length === 0;
// };

// /**
//  * used to check the number of keys inside an object
//  * these functions return false when there is no error and true when there is
//  * @param val the object to check the keys
//  * @param len the length it needs to be greater than
//  * @warn len is exclusive
//  */
// export const checkKeys = (val: object, len: number) => (Object.keys(val).length > len ? false : true);

// /**
//  * used to check the length of a string
//  * these functions return false when there is no error and true when there is
//  * @param val the value to check
//  * @param len the number of characters that val needs to have more than
//  */
// export const checkLength = (val: string, len: number) => ((val + '').length > len ? false : true);

// /**
//  * will return true if null undefined or empty is found
//  */
// export const checkForNullUndefinedOrEmptyInObject = (val) => {
//   // for each key in the object
//   return Object.keys(val).reduce((retVal, key) => {
//     // check each defined key for null blank 0 undefined or empty if so return true else return prev
//     return val[key] === null || val[key] === undefined || val[key] === '' || val[key] === 0 ? true : retVal;
//   }, false);
// };
export const properEnglish = (key: string): string => {
  const newString = key.replace(/-|_/gi, ' ');

  return newString.replace(/\w\S*/g, txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase());
};

export function checkForValidDate(val: any) {
  const parsedDate = Date.parse(val);
  if (isNaN(parsedDate)) {
    return '';
  } else {
    return val;
  }
}

export const convertDateTimeToTimeStamp = (dateTime: string): number => {
  const timeStamp = moment(dateTime).valueOf();
  return timeStamp;
};

//extract items from AllInfo
//secion is the subsection of All info to use
//lookupProp is the item you have eg id or mid or name
//returnProp is the info you want returned eg the name or id
//lookupValue is the lookupProp value you have
//example You have the sp_id of 5 and want the associated name
//   (SP, sp_id, sp_name, 5, storeObj)
export const getAllInfoIndex = (section: any, lookupProp: any, returnProp: any, lookupValue: any, storeObj: any) => {
  return storeObj['allInfo'][section].reduce((acc: any, sec: any) => {
    return { ...acc, [sec[lookupProp]]: sec[returnProp] };
  }, {})[lookupValue];
};

export function findName(id: number, arr: any[]) {
  if (arr !== undefined && id !== undefined) {
    const res = arr.find(obj => obj.id === id) || {};
    return res;
  } else {
    return {};
  }
}

export function humaniseSeconds(sec: number) {
  const d = Math.floor(sec / (3600 * 24));
  const h = Math.floor((sec % (3600 * 24)) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);

  // const dDisplay = d > 0 ? d + (d === 1 ? ' day' : ' days') : '';
  // const hDisplay = (h < 10 ? '0' + h : h) + ':';
  // const mDisplay = (m < 10 ? '0' + m : m) + ':';
  // const sDisplay = s < 10 ? '0' + s : s;

  const dDisplay = d > 0 ? d + 'd ' : '';
  const hDisplay = h > 0 ? (h < 10 ? '0' + h : h) + 'h ' : '';
  const mDisplay = (m < 10 ? '0' + m : m) + 'm';
  // const sDisplay = s < 10 ? '0' + s : s;

  // const timeDisplay = hDisplay + mDisplay + sDisplay;
  const timeDisplay = hDisplay + mDisplay;
  return (d >= 1 ? dDisplay + ' ' : '') + timeDisplay;
}

export function humaniseDays(days: number) {
  const y = Math.floor(days / 365);
  const w = Math.floor((days - 365 * y) / 7);
  const d = Math.floor(days - 365 * y - 7 * w);

  const yDisplay = y > 0 ? y + (y === 1 ? ' year, ' : ' years, ') : '';
  const wDisplay = w > 0 ? w + (w === 1 ? ' week, ' : ' weeks, ') : '';
  const dDisplay = d > 0 ? d + (d === 1 ? ' day' : ' days') : '';
  return yDisplay + wDisplay + dDisplay;
}

export function humaniseDate(date: string): string {
  const checkDate = moment(date);
  if (!!checkDate) {
    switch (true) {
      case checkDate.isSame(moment(), 'day'):
        return 'Today';
      case checkDate.isSame(moment().add(1, 'days'), 'day'):
        return 'Tomorrow';
      case checkDate.isSame(moment().subtract(1, 'days'), 'day'):
        return 'Yesterday';
      default:
        return checkDate.format('YYYY-MM-DD');
    }
  } else {
    return '-';
  }
}
