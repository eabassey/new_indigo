import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  forwardRef,
  Input,
  OnChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'flx-time-picker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXTimePickerComponent),
      multi: true
    }
  ]
})
export class FLXTimePickerComponent implements OnInit, ControlValueAccessor {
  private _minuteInterval = 15;
  @Input()
  set minuteInterval(value: number) {
    if (value) {
      this._minuteInterval = value;
      this.setMinutes();
    }
  }
  get minuteInterval() {
    return this._minuteInterval;
  }

  private _minHour = 0;
  @Input()
  set minHour(value: number) {
    if (value) {
      this._minHour = value;
      this.setHours();
    }
  }
  get minHour() {
    return this._minHour;
  }

  private _maxHour = 23;
  @Input()
  set maxHour(value: number) {
    if (value) {
      this._maxHour = value;
      this.setHours();
    }
  }
  get maxHour() {
    return this._maxHour;
  }

  private _disabledHours: { min?: number; max?: number };
  @Input()
  set disabledHours(value: any) {
    if (value) {
      this._disabledHours = value;
    }
  }
  get disabledHours() {
    return this._disabledHours;
  }

  @Input() isDisabled = false;

  @Output() changeTime: EventEmitter<any> = new EventEmitter();

  // =========== Public variables ===========
  public minutes = [];
  public hours = [];
  public selectedMinute: string;
  public selectedHour: string;
  public selectedTime: { hour: string; minutes: string };
  public showTimePicker = false;
  public formGroup: FormGroup;
  @ViewChild('timePicker', { static: true }) timePickerContainer;
  @ViewChild('listHour', { static: true }) listHour;

  // =========== Private variables ===========

  // =========== Constructor ===========
  constructor(private cdr: ChangeDetectorRef) {}

  // =========== Init function ===========
  ngOnInit() {
    this.formGroup = new FormGroup({
      hour: new FormControl('', [Validators.required]),
      minutes: new FormControl('', [Validators.required]),
      formatted_time: new FormControl('', [Validators.required])
    });

    this.setHours();
    this.setMinutes();
  }

  @Input() set autoOpen(v: boolean) {
    // console.log('autoOpen', v);
    this.showTimePicker = `${v}` === 'true' ? true : false;
    // if (this.showTimePicker) {
    //   this.timePickerShow();
    // }
  }
  get autoOpen() {
    return this.showTimePicker;
  }

  // =========== Operational functions ===========
  setHours() {
    this.hours = [];
    console.log('set hours', { min: this.minHour, max: this.maxHour });
    for (let i: any = this.minHour; i <= this.maxHour; i++) {
      i < 10 ? (i = '0' + i) : (i = i);
      this.hours.push(i.toString());
    }
  }

  setMinutes() {
    this.minutes = [];
    let nextValue = 0;
    do {
      let formattedTime = nextValue.toString();
      if (formattedTime.length === 1) {
        formattedTime = `0${nextValue.toString()}`;
      }
      this.minutes.push(formattedTime);
      nextValue += this.minuteInterval;
    } while (nextValue !== 60);
  }

  pickHour(hour) {
    if (!this.isHourDisabled(hour)) {
      this.selectedHour = hour;
      this.setTime();
    }
  }

  minPicker(min) {
    this.selectedMinute = min;
    this.setTime();
  }

  isHourDisabled(hour: number): boolean {
    let _isDisabled = false;
    if (this.disabledHours && this.disabledHours.min !== undefined && this.disabledHours.min !== null) {
      _isDisabled = Number(hour) >= this.disabledHours.min;
    }
    if (this.disabledHours && this.disabledHours.max !== undefined && this.disabledHours.max !== null) {
      _isDisabled = Number(hour) <= this.disabledHours.max;
    }
    return _isDisabled;
  }

  setTime() {
    this.selectedHour === undefined ? (this.selectedHour = '0') : (this.selectedHour = this.selectedHour);
    this.formGroup.get('hour').setValue(this.selectedHour);
    this.selectedMinute === undefined ? (this.selectedMinute = '00') : (this.selectedMinute = this.selectedMinute);
    this.formGroup.get('minutes').setValue(this.selectedMinute);
    this.selectedTime = {
      hour: this.selectedHour,
      minutes: this.selectedMinute
    };
    if (this.selectedMinute && this.selectedHour) {
      this.timeSelected();
    }
    this.formGroup.get('formatted_time').setValue(`${this.selectedTime.hour}:${this.selectedTime.minutes}`);
    this.sendChanges(this.selectedTime);
    this.changeTime.emit(this.selectedTime);
  }

  timeSelected() {
    this.showTimePicker = false;
  }

  timePickerShow() {
    this.showTimePicker = true;
    this.cdr.detectChanges();
    this.scrollEnabledItemsIntoView();
  }

  scrollEnabledItemsIntoView() {
    const elements = [];
    const _elements = document.getElementsByClassName('tick');
    if (_elements.length !== 0) {
      for (let i = 0; i < _elements.length; i++) {
        if (!_elements[i].className.includes('disabled')) {
          elements.push(_elements[i]);
        }
      }
    }
    if (elements.length !== 0) {
      elements[0].scrollIntoView();
    }
  }

  open() {
    this.timePickerShow();
    this.cdr.detectChanges();
  }

  getParentElements(element: HTMLElement, parentEls: HTMLElement[] = []): HTMLElement[] {
    // console.log(element);
    if (element) {
      if (
        element.localName === 'flx-time-picker' ||
        element.localName === 'html' ||
        element.localName === 'document' ||
        element.localName === 'body'
      ) {
        return parentEls;
      } else {
        parentEls.push(element);
        return this.getParentElements(element.parentElement as HTMLElement, parentEls);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.showTimePicker) {
      const parentEls = this.getParentElements(event.target);

      if (parentEls && !parentEls.includes(this.timePickerContainer.nativeElement)) {
        this.timeSelected();
      }
    }
  }

  // ========== Custom Form Validation functions ==========
  public sendChanges: (_: any) => {};
  public touchChanges: (_: any) => {};
  public validateFn: (_: any) => {};

  writeValue(value: { hour: string; minutes: string }): void {
    // console.log('writeValue', value);
    if (value && value.hour && value.minutes && this.formGroup) {
      this.selectedHour = value.hour;
      this.selectedMinute = value.minutes;
      this.formGroup.get('hour').setValue(this.selectedHour);
      this.formGroup.get('minutes').setValue(this.selectedMinute);
      // if (this.selectedHour !== '00') {
      this.formGroup.get('formatted_time').setValue(`${this.selectedHour}:${this.selectedMinute}`);
      // }
    } else {
      this.clearValues();
    }
  }

  clearValues() {
    this.selectedHour = null;
    this.selectedMinute = null;
    this.formGroup.get('hour').setValue(null);
    this.formGroup.get('minutes').setValue(null);
    this.formGroup.get('formatted_time').setValue(null);
  }

  registerOnChange(fn: any): void {
    this.sendChanges = fn;
  }
  registerOnTouched(fn: any): void {
    this.touchChanges = fn;
  }
  validate(c: FormControl) {
    return this.validateFn(c);
  }
}
