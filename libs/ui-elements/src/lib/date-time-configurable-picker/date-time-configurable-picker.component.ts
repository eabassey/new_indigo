import { Component, OnInit, Input, ViewChild, TemplateRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import {
  DateTimeConfigData,
  DateTimeConfiguration,
  DateTimeConfigEvents,
  IConfigTypes,
  CalendarDate,
  IDateTimePickerEvents,
} from './date-time-configurable-picker.models';
import { Observable, combineLatest, Subscription } from 'rxjs';
// import moment = require('moment');
import * as moment from 'moment';
import { FormBuilder, FormGroup, FormControl, Validators, ControlValueAccessor } from '@angular/forms';
import { pluck } from 'rxjs/operators';
import { cleanUpSub } from '@indigo/utilities';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'flx-date-time-configurable-picker',
  templateUrl: './date-time-configurable-picker.component.html',
  styleUrls: ['./date-time-configurable-picker.component.scss'],
  exportAs: 'dateTimeTypePicker',
})
export class FLXDateTimeConfigurablePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
  @Output() outputData = new EventEmitter<any>();

  _config: DateTimeConfiguration;

  calendar: any[];
  yearChangeSub: Subscription;

  weekDaysName: string[] = moment.weekdaysShort();

  months: string[] = moment.months();

  years: number[] = this.getYears();

  selectedMonth = this.months[this.getCurrentMonth()];

  year = this.getCurrentYear();

  todaysDate = moment().format(moment.HTML5_FMT.DATE);

  selectedDate = false;

  displayOptions: {
    displayKey: string;
    valueKey: string;
  };

  styles = {
    current: {
      width: '2rem',
      height: '1rem',
      margin: '25px',
      'text-align': 'center',
      'border-radius': '5px',
      'background-color': '#40665c',
      '-webkit-box-shadow': '5px 5px 5px 5px #40665c',
      'box-shadow': '5px 5px 5px 5px #40665c',
    },
    selected: {
      width: '2rem',
      height: '1rem',
      margin: '25px',
      'text-align': 'center',
      'border-radius': '5px',
      'background-color': '#3b818c',
      '-webkit-box-shadow': '1px 1px 1px 1px #bfa030',
      'box-shadow': '1px 1px 1px 1px #bfa030',
    },
  };

  //Configuration filter by defaults show all screens.
  _configFilter: IConfigTypes[] = [IConfigTypes.datePicker, IConfigTypes.timePicker, IConfigTypes.typeOfTime];
  nextMonthIsDisabled = false;
  previousMonthIsDisabled = false;
  currentSelectedDate: string;

  pickTime = false;
  // today = new Date();
  timeForPicker = {};
  public formGroup: FormGroup;
  private _appointmentTimeSub: Subscription;

  // appointment = new FormGroup({
  //   appointmentTime: new FormControl(),
  // });

  sendChanges: (_: any) => {};
  touchChanges: () => {};
  disabled: boolean;

  @Input() set config(config: DateTimeConfiguration) {
    this._config = config;
    this._configFilter = config.configFilter;
  }
  get config() {
    return this._config;
  }

  get configFilter() {
    return this._configFilter;
  }

  @Input() data$: Observable<DateTimeConfigData>;
  setYearForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({ appointment_time: new FormControl({ hour: '', minutes: '' }, [Validators.required]) });
    this._appointmentTimeSub = this.formGroup.get('appointment_time').valueChanges.subscribe((appointmentTimeChanges) => {
      this.setTime(appointmentTimeChanges);
    });

    if (this.isFilterConfigurationsType('datePicker') !== -1) {
      this.getCalendar();

      this.getCurrentSelectedDate();

      this.displayOptions = {
        displayKey: 'year',
        valueKey: 'id',
      };

      this.setYearForm = this._fb.group({ selectYear: ['Select Year'] });

      this.setSelectedYear(this.getYearId(this.getCurrentYear()));

      this.enablePreviousNext();
      this.onYearChange();
    }
    if (this.isFilterConfigurationsType('timePicker') !== -1) {
      this.timeForPicker = { hour: '00', minutes: '00' };
    }

    // this.data$.pipe(pluck('timeData')).subscribe((data) => {
    //   console.log('data', data);
    //   // this.formGroup.get('appointment_time').setValue(data);
    // });

    // this.setYearForm.valueChanges.subscribe((val) => {
    //   console.log('selectedYear', val.selectYear);
    //   this.year = this.getYears()[val.selectYear].year;
    // });
  }
  getCurrentSelectedDate() {
    this.currentSelectedDate = moment().format(moment.HTML5_FMT.DATE);
  }
  getCalendar(): void {
    this.calendar = this.generateCalendar(this.selectedMonth, this.year);
  }
  getYearId(year: string): number {
    const indexId = this.getYears().findIndex((y) => y.year === year);
    return this.getYears()[indexId].id;
  }
  onYearChange() {
    this.yearChangeSub = this.setYearForm.get('selectYear').valueChanges.subscribe((val) => {
      this.year = this.getYears()[val].year;
      this.updateMonth();
    });
  }

  isFilterConfigurationsType(x: string) {
    return this.configFilter.indexOf(x as IConfigTypes);
  }
  enablePreviousNext() {
    if (this.months.indexOf(this.selectedMonth) !== 0) {
      this.previousMonthIsDisabled = false;
    }
    if (this.months.indexOf(this.selectedMonth) !== this.months.length - 1) {
      this.nextMonthIsDisabled = false;
    }
  }
  getMomentDay(day) {
    return moment(day)
      .format('D')
      .toString();
  }

  generateCalendar(month, year) {
    const endDate = moment()
      .date(0)
      .month(month)
      .year(year);

    return Array(endDate.date())
      .fill(0)
      .map((_, i) =>
        moment()
          .date(i + 1)
          .month(month)
          .year(year),
      )
      .map((day) => ({ day, week: day.week() }))
      .filter(({ week }, i, arr) => arr.findIndex((info) => info.week === week) === i)
      .map(({ day, week }) => ({
        week,
        days: Array(7)
          .fill(0)
          .map((_, i) => {
            const momentDate: moment.Moment = moment(day)
              .week(week)
              .startOf('week')
              .add(i, 'day');
            return <CalendarDate>{
              calendarDate: momentDate,
              selected: this.selectedDate ? true : false,
              today: this.compareDates(momentDate) ? true : false,
            };
          }),
      }));
  }
  nextMonth() {
    const currentMonthIndex = this.months.indexOf(this.selectedMonth);
    if (currentMonthIndex + 1 === this.months.length) {
      this.nextMonthIsDisabled = true;
      this.previousMonthIsDisabled = false;
    } else {
      this.selectedMonth = this.months[currentMonthIndex + 1];
      this.updateMonth();
      this.enablePreviousNext();
    }
  }
  previousMonth() {
    const currentMonthIndex = this.months.indexOf(this.selectedMonth);
    if (currentMonthIndex - 1 === -1) {
      this.previousMonthIsDisabled = true;
      this.nextMonthIsDisabled = false;
    } else {
      this.selectedMonth = this.months[currentMonthIndex - 1];
      this.updateMonth();
      this.enablePreviousNext();
    }
  }

  getYears(): any[] {
    const yearsArrIn = [];
    const startDate = moment().subtract(20, 'years');
    const endDate = moment().add(20, 'years');
    const years = moment(endDate).diff(startDate, 'years');
    for (let year = 0; year < years; year++) {
      yearsArrIn.push({ id: year, year: (startDate.get('year') + year).toString() });
    }
    return yearsArrIn;
  }
  getCurrentYear() {
    const year = moment().get('year');
    return year.toString();
  }

  setSelectedYear(index: number) {
    // console.log('index', index);
    this.year = this.getYears()[index].year;
    this.setYearForm.get('selectYear').setValue(this.getYears()[index].id);
    this.updateMonth();
  }

  getCurrentMonth() {
    return moment()
      .get('month')
      .toString();
  }

  compareDates(date: any) {
    const mDate = moment(date).format(moment.HTML5_FMT.DATE);
    const now = moment().format(moment.HTML5_FMT.DATE);
    if (now === mDate) {
      return true;
    } else {
      return false;
    }
  }

  onDateClick(date: CalendarDate) {
    this.currentSelectedDate = moment(date.calendarDate).format(moment.HTML5_FMT.DATE);
    this.calendar.forEach((cal) => {
      cal.days.forEach((cDate) => {
        if (moment(cDate.calendarDate).isSame(date.calendarDate)) {
          cDate.selected = true;
        } else {
          cDate.selected = false;
        }
      });
    });
    this.sendDateOutput();
  }

  getCurrentDayStyle(calendar: CalendarDate) {
    if (calendar.today) return this.styles.current;
    else return '';
  }

  getActiveStyle() {
    return this.styles.selected;
  }

  updateMonth() {
    this.calendar = this.generateCalendar(this.selectedMonth, this.year);
  }

  selectTodayDate() {
    // Resetting the year to current year.
    this.setSelectedYear(this.getYearId(this.getCurrentYear()));
    // Setting selected date.
    this.currentSelectedDate = moment(moment()).format(moment.HTML5_FMT.DATE);
    // Selecting today as date.
    this.calendar.forEach((cal) => {
      cal.days.forEach((cDate) => {
        if (cDate.today) {
          cDate.selected = true;
        } else {
          cDate.selected = false;
        }
      });
    });
  }

  selectTomorrowDate() {
    // console.log('Tomorrow');
    // Resetting the year to current year.
    this.setSelectedYear(this.getYearId(this.getCurrentYear()));
    // Setting selected date.
    this.currentSelectedDate = moment(moment()).format(moment.HTML5_FMT.DATE);

    this.calendar.forEach((cal) => {
      cal.days.forEach((cDate) => {
        if (
          moment(cDate.calendarDate.format(moment.HTML5_FMT.DATE)).isSame(
            moment()
              .add(1, 'day')
              .format(moment.HTML5_FMT.DATE),
          )
        ) {
          cDate.selected = true;
        } else {
          cDate.selected = false;
        }
      });
    });
  }

  sendDateOutput() {
    this.outputData.emit({ type: IDateTimePickerEvents.selectedDateEvent, payload: this.currentSelectedDate });
  }

  sendTimeType(type) {
    this.outputData.emit({ type: IDateTimePickerEvents.selectedTypeEvent, payload: type });
  }

  sendTimePicked(timePicked) {
    this.outputData.emit({ type: IDateTimePickerEvents.selectedTimeEvent, payload: timePicked });
  }

  // Time picker handling methods

  setTime(event) {
    const { hour, minutes } = event;
    this.timeForPicker = { hour, minutes };
    this.sendTimePicked(this.timeForPicker);
    // this.appointment.controls['appointmentTime'].setValue(`${hour}:${minutes}`);
  }

  // timePickerShow() {
  //   this.pickTime = true;
  // }

  // hideTimePicker(event) {
  //   event ? (this.pickTime = false) : (this.pickTime = true);
  //   console.log(this.pickTime);
  //   this.outputData({ type: IDateTimePickerEvents.hideTimePicker, payload: this.pickTime });
  // }
  // *****************************

  writeValue(obj: any): void {
    // console.log('time', obj);
    if (obj.match(/:/g)) {
      const hour = obj.substring(0, obj.indexOf(':') - 1);
      const minutes = obj.substring(obj.indexOf(':') + 1, obj.length);
      // console.log('hour', hour);
      // console.log('minutes', minutes);
      this.formGroup.get('appointment_time').setValue({ hour, minutes });
      this.sendTimePicked(obj);
    }
  }
  registerOnChange(fn: any): void {
    this.sendChanges = fn;
  }
  registerOnTouched(fn: any): void {
    this.touchChanges = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    if (this._appointmentTimeSub) {
      this._appointmentTimeSub.unsubscribe();
    }

    cleanUpSub(this.yearChangeSub);
  }
}
