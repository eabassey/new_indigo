/**
 * This function is used to convert a set to an array. internally it makes
 * use of the sets value iterators to do the conversion.
 * @warning do not assume referential safety when using this method as there is no copying
 * @param s set to be converted to an array of the same type
 */
export function setToArray<T>(s: Set<T>): Array<T> {
  const values = s.values();
  const arrOut: Array<T> = [];
  for (let entry = values.next(); entry.done === false; entry = values.next()) {
    arrOut.push(entry.value);
  }
  return arrOut;
}

// export function b64toBlob(b64Data, contentType = '', sliceSize = 512): Blob {
//   const byteCharacters = atob(b64Data);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.slice(offset, offset + sliceSize);

//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     const byteArray = new Uint8Array(byteNumbers);

//     byteArrays.push(byteArray);
//   }

//   const blob = new Blob(byteArrays, { type: 'application/pdf' });
//   return blob;
// }

/**
 * This function is used to take an array and transform it into an object, it is still something of a work in progress , you will probably use it a lot when
 * doing method overloading in my case for constructors
 * @param arrValues an array of values that will be pushed into the object
 * @param arrKey an array of keys that the values must be assigned to when building said object
 */
export function transformArrayToObject<T>(arrValues: Array<T>, arrKey: Array<string>): { [key: string]: Array<T>[keyof Array<T>] } {
  const arrValuesLen = arrValues.length;
  const arrKeyLen = arrKey.length;
  // if not equal they will enter so only need to check one is truthy
  if (arrValuesLen > arrKeyLen || !arrKeyLen || !arrValuesLen) {
    throw new Error(`This function expects two arrays with the second being at least as large as the first`);
  }

  const objOut = {};
  for (let idx = 0; idx < arrValuesLen; idx++) {
    objOut[arrKey[idx]] = arrValues[idx];
  }

  return objOut;
}

/**
 * a function that will attempt to parse a number as a floating point
 * @param value value to be converted to a float
 */
export const toFloat = (value: any): number => {
  return parseFloat(`${value}`);
};

/**
 * a function that will attempt to parse a value as a boolean
 * @param value value to be converted to a boolean
 * @return false if the conversion fails. or if value was false
 */
export function toBoolean(value: any): boolean {
  return /^t|(true)$/gi.test(`${value}`);
}

/**
 * a function to convert a number to an integer
 * @param value value to attempt to convert to an integer
 */
export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}
