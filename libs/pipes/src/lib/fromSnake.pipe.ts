import { Pipe, PipeTransform } from '@angular/core';

export const fromSnake = (value: string) => `${value}`.replace(/_/g, ` `).replace(/(\b[a-z])/g, (letter) => letter.toLocaleUpperCase());

export const isSnake = (value: string) => /(^[a-z][a-z]*)(_[a-z]*)*([a-z]$)/g.test(`${value}`);

@Pipe({ name: 'flxFromSnake' })
export class FLXFromSnakePipe implements PipeTransform {
  transform(value: string) {
    return fromSnake(value);
  }
}
