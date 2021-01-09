import { isNullOrUndefined } from './validation';

/**
 * a function used to traverse an object by a supplied string index
 * @param obj object to travers through by the supplied index
 * @param index the string index to traverse the object with traversal points separated by '.' ie obj.'1.x'.
 *  if index is '' it will return the object that was passed ot it
 * @param def the default value to return in the case the the intended return value is not found
 */
// export const getByIndex = (obj: object, index: string, def = null) =>
//   index !== ''
//     ? !isNullOrUndefined(obj)
//       ? index.split('.').reduce(
//           (pv: object, cv) => {
//             return !isNullOrUndefined(pv) && pv !== def ? pv[cv] : def;
//           },
//           // isNullOrUndefined(pv) || pv === def ? def : pv[cv],
//           obj,
//         )
//       : def
//     : obj;

/**
 * a function used to traverse an object by a supplied string index
 * @param obj object to travers through by the supplied index
 * @param index the string index to traverse the object with traversal points separated by '.' ie obj.'1.x'.
 *  if index is '' it will return the object that was passed ot it
 * @param def the default value to return in the case the the intended return value is not found
 */
// export const getByArrayIndex = (obj: object, index: string[], def = null) =>
//   !!index && index.length > 0
//     ? !isNullOrUndefined(obj)
//       ? index.reduce(
//           (pv: object, cv) => {
//             return !isNullOrUndefined(pv) && pv !== def ? pv[cv] : def;
//           },
//           // isNullOrUndefined(pv) || pv === def ? def : pv[cv],
//           obj,
//         )
//       : def
//     : obj;

/**
 * Function to embed an item inside an object, pretty simple but quite powerful when combined
 * with the merges
 * @param itemToEmbed item to embed inside the object
 * @param path the path that will be followed to reach the object once it has been embedded
 */
export function embedInObject(itemToEmbed: any, path: Array<string>) {
  const len = path.length;
  let ret = itemToEmbed;
  if (len == 0) {
    return itemToEmbed;
  }
  for (let idx = len - 1; idx > -1; idx--) {
    // console.log("before",ret)
    ret = { [path[idx]]: ret };
    // console.log("after",ret)
  }
  return ret;
}
