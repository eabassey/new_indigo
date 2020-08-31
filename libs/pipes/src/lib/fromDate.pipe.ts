import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

export const isDate = (value) => (/\d{4}-\d{2}-\d{2}/g.test(`${value}`) ? moment(`${value}`).isValid() : false);
export const fromDate = (value) => moment(`${value}`).format('DD-MMM-YYYY : hh:mm a');

@Pipe({ name: 'fsFromDate' })
export class FLXFromDatePipe implements PipeTransform {
  transform(value: string) {
    return fromDate(value);
  }
}
