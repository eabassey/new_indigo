import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'flxObjectValues' })
export class FLXObjectValuesPipe implements PipeTransform {
  transform(value: Object | any[]) {
    if (value && value !== {} && value !== []) {
      return Object.values(value);
    } else {
      return [];
    }
  }
}
