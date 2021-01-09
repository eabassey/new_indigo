import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'callfilter'
})
export class FLXCallFilterPipe implements PipeTransform {
  transform(value: string, ...items: any): any {
    if (value !== undefined && value !== null) {
      switch (items[0]) {
        case 'callReason':
          return items[1].find((i: any) => i.id === value).name;
        case 'callChannel':
          return items[1].find((i: any) => i.id === value).name;
        case 'callDirection':
          return items[1].find((i: any) => i.id === value).name;
        default:
          return '';
      }
    } else {
      return '';
    }
  }
}

// ['callReason', [{id: '123', name: 'Mikayla'}]]
