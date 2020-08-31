import * as moment from 'moment';

export interface DateTimeConfigData {
  hideShowTime?: boolean;
  timeData: { hour: string; minutes: string };
}

export interface DateTimeConfiguration {
  configFilter: IConfigTypes[];
}

export interface DateTimeConfigEvents {
  type: IDateTimePickerEvents;
  payload?: any;
}

export enum IConfigTypes {
  'datePicker' = 'datePicker',
  'typeOfTime' = 'typeOfTime',
  'timePicker' = 'timePicker',
}

export enum IDateTimePickerEvents {
  'selectedDateEvent' = 'selectedDateEvent',
  'selectedTimeEvent' = 'selectedTimeEvent',
  'selectedTypeEvent' = 'selectedTypeEvent',
  'hideTimePicker' = 'hideTimePicker',
}

export interface CalendarDate {
  calendarDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}
