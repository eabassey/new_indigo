import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { path, mergeDeepRight, last, assocPath, split } from 'ramda';
import { debounceTime, map } from 'rxjs/operators';
import { Transformable } from '../models/transformable';





@Injectable({providedIn: 'root'})
export class DataTransformersService {
  constructor() {}

  transform (data: any, transformable: Transformable) {
    let parentRawArray;
    if (transformable.parentPath) {
      const splittedParentPath = split('.', transformable.parentPath);
      parentRawArray = path(splittedParentPath, data);
    } else {
      parentRawArray = data;
    }
    return parentRawArray.map(parentRawObj => {
      const parentObj = transformFunc(parentRawObj, transformable.parentMapper);
      if (transformable?.childMappers?.length) {
        transformable.childMappers.forEach(child => {
          const splittedPath = split('.', child.path);
          const childRawArray = path(splittedPath, parentRawObj);
          if (childRawArray) {
            const childArray = childRawArray.map(childRawObj => {
              const childObj = transformFunc(childRawObj, child.mapper);
             return childObj;
            });
            const childPropName = last(splittedPath);
            parentObj[childPropName] = childArray;
          }
       });
      }
      return parentObj;
    })
  }
}


export const transformFunc = (inputObject, mapper: { [key: string]: any }) => {
  return Object.entries(mapper).reduce((acc, [inputPath, outputPath]) => {
    const valueExists =
      path(inputPath.split('.'), inputObject) !== undefined && path(inputPath.split('.'), inputObject) !== null;
    if (typeof outputPath === 'string') {
      return valueExists
        ? mergeDeepRight(acc, assocPath(outputPath.split('.'), path(inputPath.split('.'), inputObject), {}))
        : acc;
    } else if (Array.isArray(outputPath) && typeof outputPath[0] === 'string') {
      return outputPath.reduce((innerAcc, innerStorePath) => {
        const innerObj = valueExists
          ? mergeDeepRight(
              innerAcc,
              assocPath(innerStorePath.split('.'), path(inputPath.split('.'), inputObject), {})
            )
          : innerAcc;
        return mergeDeepRight(acc, innerObj);
      }, {});
    }
  }, {});
};
