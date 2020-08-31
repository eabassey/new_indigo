import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephoneNumber'
})
export class TelephoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    const newVal = value.replace(/\s+/g, '');
    switch (newVal.length) {
      case 10:
        const finalStandard = `${newVal.slice(0, 3)} ${newVal.slice(
          3,
          6
        )} ${newVal.slice(6, 10)}`;
        return finalStandard;

      case 11:
        const finalWithoutPlus = `(${newVal.slice(0, 2)}) (0)${newVal.slice(
          2,
          4
        )} ${newVal.slice(4, 7)} ${newVal.slice(7, 11)}`;
        return finalWithoutPlus;

      case 12:
        if (newVal.slice(0, 1) === '+') {
          const finalWithPlus = `(${newVal.slice(1, 3)}) (0)${newVal.slice(
            3,
            5
          )} ${newVal.slice(5, 8)} ${newVal.slice(8, 12)}`;
          return finalWithPlus;
        } else {
          return value;
        }
      default:
        return value;
    }
  }
}
