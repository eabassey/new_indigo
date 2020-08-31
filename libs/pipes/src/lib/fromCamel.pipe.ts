import { Pipe, PipeTransform } from '@angular/core';

export const isCamel = (value: string) => /((^[a-z]+)([A-Z][a-z]*)*([a-zA-Z]$))/g.test(`${value}`);

export const fromCamel = (value: string) =>
  `${value}`.replace(/(^[a-z])/g, (letter) => letter.toLocaleUpperCase()).replace(/(?!(^[A-Z]))[A-Z]/g, (letter) => ` ${letter}`);

@Pipe({ name: 'fsFromCamel' })
export class FLXFromCamelPipe implements PipeTransform {
  transform(value: string) {
    return fromCamel(value);
  }
}
