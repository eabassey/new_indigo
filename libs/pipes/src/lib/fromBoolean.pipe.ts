import { Pipe, PipeTransform } from '@angular/core';

export const isBoolean = value =>
  typeof value === 'boolean' || /^(t|(true)|f|(false))$/gi.test(`${value}`) ? true : false;
export const fromBoolean = value =>
  // {
  //   return value === true || /^(t|(true))$/gi.test(`${value}`) ? 'Yes' : 'No';
  // };
  value === true || /^(t|(true))$/gi.test(`${value}`) ? 'Yes' : 'No';

@Pipe({ name: 'fsFromBoolean' })
export class FLXFromBooleanPipe implements PipeTransform {
  transform(value) {
    return fromBoolean(value);
  }
}
