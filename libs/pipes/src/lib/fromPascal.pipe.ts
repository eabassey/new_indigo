import { Pipe, PipeTransform } from '@angular/core';

export const isPascal = (value: string) => /((^[A-Z][a-z]+)([A-Z][a-z]*)*([a-zA-Z]$))/g.test(`${value}`);

export const fromPascal = (value: string) => `${value}`.replace(/(?!(^[A-Z]))[A-Z]/g, (letter) => ` ${letter}`);

@Pipe({ name: 'flxFromPascal' })
export class FLXFromPascalPipe implements PipeTransform {
  transform(value: string) {
    return fromPascal(value);
  }
}
