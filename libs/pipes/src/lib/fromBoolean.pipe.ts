import { Pipe, PipeTransform } from '@angular/core';

export const isBoolean = (value: any) =>
  typeof value === 'boolean' || /^(t|(true)|f|(false))$/gi.test(`${value}`) ? true : false;
export const fromBoolean = (value: any) =>
  // {
  //   return value === true || /^(t|(true))$/gi.test(`${value}`) ? 'Yes' : 'No';
  // };
  value === true || /^(t|(true))$/gi.test(`${value}`) ? 'Yes' : 'No';

@Pipe({ name: 'fsFromBoolean' })
export class FLXFromBooleanPipe implements PipeTransform {
  transform(value: any) {
    return fromBoolean(value);
  }
}
