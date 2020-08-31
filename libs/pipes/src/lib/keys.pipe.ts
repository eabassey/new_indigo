import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fsObjectKeys' })
export class FLXObjectKeysPipe implements PipeTransform {
  transform(value: Object | any[]) {
    if (value !== null && value !== undefined) {
      return Object.keys(value);
    } else {
      return [];
    }
  }
}
