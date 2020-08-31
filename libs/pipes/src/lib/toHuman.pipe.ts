import { Pipe, PipeTransform } from '@angular/core';
import { isSnake, fromSnake } from './fromSnake.pipe';
import { isPascal, fromPascal } from './fromPascal.pipe';
import { isCamel, fromCamel } from './fromCamel.pipe';
import { isDate, fromDate } from './fromDate.pipe';
import { isBoolean, fromBoolean } from './fromBoolean.pipe';

@Pipe({ name: 'fsToHuman' })
export class FLXToHuman implements PipeTransform {
  transform(value: string) {
    switch (true) {
      case isDate(value):
        return fromDate(value);
      case isBoolean(value):
        return fromBoolean(value);
      case isSnake(value):
        return fromSnake(value);
      case isPascal(value):
        return fromPascal(value);
      case isCamel(value):
        return fromCamel(value);
      default:
        return value;
    }
  }
}
