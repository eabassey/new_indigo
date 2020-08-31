import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, forwardRef, Input, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Time } from '@angular/common';
import { ITimePicker, SliderType, IStartTime } from './time-picker-slider.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'flx-time-slider',
  templateUrl: './time-picker-slider.component.html',
  styleUrls: ['./time-picker-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXTimePickerSiderComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => FLXTimePickerSiderComponent),
    },
  ],
})
export class FLXTimePickerSiderComponent implements OnInit, AfterViewInit, ControlValueAccessor, Validator, OnDestroy {
  multipleSliderForm: FormGroup;
  singleSliderForm: FormGroup;
  currentTimeSliderForm: FormGroup;
  selectedId: number;
  lsttimeInterval: string[];
  maxTimeInterval: number;
  pickTimeDate: {
    today?: boolean;
    tommorow?: boolean;
    custom?: boolean;
  } = { today: true };

  @Input() disabled = false;
  //required
  @Input() sliderType: BehaviorSubject<SliderType>;
  //required
  @Input() selectedDate: BehaviorSubject<string>;

  sliderSubscription: Subscription;

  // selected = {id:1,name:'Before'}||{ id: 2, name: 'After' } || { id: 3, name: 'Between' }
  selected: {
    id: number;
    name: string;
  } = { id: 1, name: 'Before' } || { id: 2, name: 'After' } || { id: 3, name: 'Between' } || { id: 4, name: 'At' };
  //required field
  @Input()
  sldrTimeInterval: {
    startTime: { hours: number; minutes: number };
    endTime: { hours: number; minutes: number };
    stepBy: number;
  }; //= { startTime: { hours: 9, minutes: 0 }, endTime: { hours: 17, minutes: 30 }, stepBy: 30 };

  @ViewChild('rsRangeLine', { static: true }) rangeSlider: ElementRef<HTMLInputElement>;
  @ViewChild('rsBullet', { static: true }) rangeBullet;
  @ViewChild('rsBullet0', { static: true }) rangeBullet0;
  @ViewChild('rsBullet1', { static: true }) rangeBullet1;
  // @ViewChild('searchDD') select;
  // @ViewChild('slider0') slider0: ElementRef;
  @ViewChild('slider1', { static: true }) slider1: ElementRef;
  @ViewChild('slider2', { static: true }) slider2: ElementRef;
  @ViewChild('multipleSlider', { static: true }) multipleSlider: ElementRef;
  @ViewChild('singleSlider', { static: true }) singleSlider: ElementRef;
  // sldr1: number;
  // sldr2: number;
  x: number;
  y: number;
  beginTime: any;
  endTime: any;
  text = '';
  subsldr1: Subscription;
  subsldr2: Subscription;
  subsldr: Subscription;
  subsldrCurrent: Subscription;
  currentTimeIndex: string;
  selectedDateSub: Subscription;
  errorMessage: string;

  createlistTimeFromInterval(): string[] {
    const strTimeArray = [];
    const stepBy: number = this.sldrTimeInterval.stepBy;
    let startTime = moment(this.sldrTimeInterval.startTime).format('HH:mm');

    do {
      strTimeArray.push(startTime.replace(':', 'h'));
      startTime = moment(startTime, 'HH:mm')
        .add(stepBy, 'm')
        .format('HH:mm');
    } while (moment(startTime, 'HH').hours() !== this.sldrTimeInterval.endTime.hours + 1);
    // console.log('strTimeArray', strTimeArray);
    return strTimeArray;
  }
  renderCurrentTime() {
    const lstTime = this.createlistTimeFromInterval();
    // console.log('lstTime', lstTime);
    const hours = moment().hour();
    // console.log('timeTT', hours);
    let index = 0;
    let i = 0;
    while (i <= lstTime.length - 1) {
      //  console.log('index' + i, lstTime[i]);
      const timeString = lstTime[i].replace('h', ':');
      if (moment(timeString, 'HH:mm').hour() === hours) {
        index = i;
        break;
      }
      i++;
    }
    //  console.log('T-Index', index);
    return index;
  }

  renderTodayTime(): IStartTime {
    const hours = moment().hour();
    const minutes = moment().minutes();
    let convertedMinutes = 0;
    let convertedHours = 0;
    if (minutes >= this.sldrTimeInterval.stepBy) {
      convertedMinutes = this.sldrTimeInterval.stepBy;
      convertedHours = hours + 1;
    } else {
      convertedMinutes = this.sldrTimeInterval.stepBy; // + minutes;
      convertedHours = hours;
    }

    return { startTime: { hours: convertedHours, minutes: convertedMinutes } };
  }

  createCurrentTime(): string[] {
    const timeStringArray = [];
    const stepBy: number = this.sldrTimeInterval.stepBy;
    //Extracting current time.
    let startTime = moment(this.renderTodayTime().startTime).format('HH:mm');
    // Checking if today's time is less than current time so we will know when to take the start time interval or current time.
    if (this.sldrTimeInterval.startTime.hours > this.renderTodayTime().startTime.hours) {
      startTime = moment(this.sldrTimeInterval.startTime).format('HH:mm');
    }
    // Creating new list of points for input range.
    do {
      timeStringArray.push(startTime.replace(':', 'h'));
      startTime = moment(startTime, 'HH:mm')
        .add(stepBy, 'm')
        .format('HH:mm');
    } while (moment(startTime, 'HH').hours() !== this.sldrTimeInterval.endTime.hours + 1);
    return timeStringArray;
  }
  // Calculating width of the elapsed time
  calculatedWidth() {
    //Retrieving current time extracting the current hour, with step time as minutes.
    const currentIndex: number = this.renderCurrentTime();
    //List of points in the input range.
    const totalIndex: number = this.createlistTimeFromInterval().length;
    return this.pickTimeDate.today ? (currentIndex / totalIndex) * 100 : 0;
  }
  //  Calculate Buffer width set time 1 point (step size) before setting appointment by dividing with total points multiply by 100 converting it to %.
  calculateBufferWidth() {
    const totalIndex: number = this.createlistTimeFromInterval().length;
    return this.pickTimeDate.today ? (1 / totalIndex) * 100 : 0;
  }

  calculateEndWith() {
    return 0;
  }
  calculateEndBufferWith() {
    return 0;
  }

  onTouch = (_: boolean) => {};
  onChange = (_: any) => {};
  _onValidatorChange = () => {};

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.start();
    });
  }
  writeValue(obj: any): void {
    // this.text = obj;
    this.onChange(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.selectedDateSub = this.selectedDate.subscribe((date) => {
      // console.log('Is Date Old', moment(date).diff(moment(), 'days'));

      if (moment(date).isValid()) {
        if (moment(date).diff(moment(), 'days') >= 0) {
          this.errorMessage = null;
          if (
            moment(date)
              .format(moment.HTML5_FMT.DATE)
              .toString() ===
            moment()
              .format(moment.HTML5_FMT.DATE)
              .toString()
          ) {
            this.pickTimeDate = { custom: false, today: true, tommorow: false };
          } else {
            this.pickTimeDate = { custom: true, today: false, tommorow: true };
          }
        } else {
          this.errorMessage = "Selected date can not be old than today's date.!";
        }
      }

      if (this.pickTimeDate.today) {
        this.lsttimeInterval = this.createCurrentTime();
      } else {
        this.lsttimeInterval = this.createlistTimeFromInterval();
      }

      // this.maxTimeInterval = this.lsttimeInterval.length - 1;
    });

    this.maxTimeInterval = this.lsttimeInterval.length - 1;

    // this.slider2.nativeElement.value = this.maxTimeInterval;

    this.multipleSliderForm = this._fb.group({
      sldr1: [''],
      sldr2: [''],
      sldrCurrent: [''],
    });

    this.singleSliderForm = this._fb.group({
      sldr: [''],
    });

    this.rangeBullet.nativeElement.value = '1';

    this.rangeBullet0.nativeElement.value = '1';

    this.rangeBullet1.nativeElement.value = '1';

    this.sliderSubscription = this.sliderType.subscribe((val) => {
      switch (val) {
        case 'Before':
          {
            this.selected = { id: 1, name: 'Before' };
            this.whatValue();
          }
          break;
        case 'After':
          {
            this.selected = { id: 2, name: 'After' };
            this.whatValue();
          }
          break;
        case 'Between':
          {
            this.selected = { id: 3, name: 'Between' };
            this.whatValue();
          }
          break;
        case 'At':
          {
            this.selected = { id: 4, name: 'At' };
            this.whatValue();
          }
          break;
      }
    });

    // tslint:disable-next-line: radix
    // this.sldr1 = parseInt(this.slider1.nativeElement.value);

    this.multipleSliderForm.get('sldr1').setValue(parseInt(this.slider1.nativeElement.value, 10));

    // tslint:disable-next-line: radix
    // this.sldr2 = parseInt(this.slider2.nativeElement.value);

    // this.multipleSliderForm.get('sldr2').setValue(parseInt(this.slider2.nativeElement.value, 10));
    this.multipleSliderForm.get('sldr2').setValue(this.maxTimeInterval);

    this.x = this.sldr1;
    this.y = this.sldr2;

    this.beginTime = this.convertToTimeMul(this.x);
    this.endTime = this.convertToTimeMul(this.y);

    this.subsldr1 = this.multipleSliderForm.get('sldr1').valueChanges.subscribe((value) => {
      this.sliderOneChange(value);
    });

    this.subsldr2 = this.multipleSliderForm.get('sldr2').valueChanges.subscribe((value) => {
      this.sliderTwoChange(value);
    });

    this.subsldr = this.singleSliderForm.get('sldr').valueChanges.subscribe((value) => {
      this.showSliderValue();
    });

    // this.slider0.nativeElement.value = this.renderCurrentTime().toString();
    // console.log('slider0', this.slider0.nativeElement.value);

    this.currentTimeIndex = this.renderCurrentTime().toString();
    //this.slider0.nativeElement.disabled = true;
  }

  ngOnDestroy(): void {
    if (this.sliderSubscription) {
      this.sliderSubscription.unsubscribe();
    }
    if (this.subsldr1) {
      this.subsldr1.unsubscribe();
    }
    if (this.subsldr2) {
      this.subsldr2.unsubscribe();
    }
    if (this.subsldr) {
      this.subsldr.unsubscribe();
    }
    if (this.selectedDateSub) {
      this.selectedDateSub.unsubscribe();
    }
  }

  get sldr1(): number {
    return this.multipleSliderForm.get('sldr1').value;
  }
  get sldr2(): number {
    return this.multipleSliderForm.get('sldr2').value;
  }

  showSliderValue() {
    this.rangeBullet.nativeElement.innerHTML = this.rangeSlider.nativeElement.value;
    const bulletPosition = +this.rangeSlider.nativeElement.value / +this.rangeSlider.nativeElement.max;
    this.rangeBullet.nativeElement.style.left = bulletPosition * 580 + 'px';
    let t = this.rangeSlider.nativeElement.value;
    // this.change();
    this.convertToTime(t);
  }

  start() {
    const t = this.rangeSlider.nativeElement.value;
    this.rangeBullet.nativeElement.innerHTML = t;

    const i = this.slider1.nativeElement.value;
    this.rangeBullet0.nativeElement.innerHTML = this.lsttimeInterval[parseInt(i, 10)];

    const n = this.slider2.nativeElement.value;
    this.rangeBullet1.nativeElement.innerHTML = this.lsttimeInterval[parseInt(n, 10)];

    this.convertToTime(t);
  }

  convertToTime(time) {
    // console.log('we here');
    const t = this.rangeSlider.nativeElement.value;
    time = this.lsttimeInterval[parseInt(t, 10)];
    this.rangeBullet.nativeElement.innerHTML = time;

    if (this.onChange) {
      this.onChange(time);
    }
    this.whatValue();
  }

  // change() {
  //  let time-mode = document.getElementsByClassName(".range-slider")[0];
  //  if (t < 6) {
  //    time-mode.getElementsByClassName("rs-label-day")[0].innerHTML = "PM";
  //  }
  //  else {
  //    time-mode.getElementsByClassName("rs-label-day")[0].innerHTML = "AM";
  //  }
  // }

  whatValue() {
    // const x = this.select.nativeElement.value;
    // const x = this.selectedId;

    const x = this.selected.id;
    this.changeArrow(x);
  }

  changeArrow(arrow) {
    let arrowVal;
    let displayText;
    // tslint:disable-next-line: radix
    const arrowint = parseInt(arrow);

    if (arrowint === 1) {
      arrowVal = 1;
      displayText = 'Before';
      this.setDataBefore();
    } else if (arrowint === 2) {
      arrowVal = 2;
      displayText = 'After';
      this.setDataAfter();
    } else if (arrowint === 3) {
      // console.log('in arrow function between');
      arrowVal = 3;
      displayText = 'Between';
      this.setBetween();
    } else if (arrowint === 4) {
      // console.log('in arrow function At');
      arrowVal = 4;
      displayText = 'At';
      this.setDataAt();
    }

    this.displayAll(displayText);
  }

  displayAll(BAB) {
    // this.text = BAB + ' ' + this.rangeBullet.nativeElement.innerHTML;
    this.text = this.rangeBullet.nativeElement.innerHTML;
    if (BAB === 'Between') {
      // this.onChange(BAB + ' ' + this.beginTime + ' - ' + this.endTime);
      this.onChange(this.beginTime + ' - ' + this.endTime);
    } else {
      this.onChange(this.text);
    }
  }

  setDataAfter() {
    //   $('<style>.rs-range::-webkit-slider-thumb { border-left: 10px solid white; border-right: none; }<style/>').appendTo('head');
    //   console.log('done');
    this.multipleSlider.nativeElement.style.display = 'none';
    this.singleSlider.nativeElement.style.display = 'initial';
  }

  setDataBefore() {
    //   $('<style>.rs-range::-webkit-slider-thumb { border-right: 10px solid white; border-left: none; }<style/>').appendTo('head');
    this.multipleSlider.nativeElement.style.display = 'none';
    this.singleSlider.nativeElement.style.display = 'initial';
  }

  setBetween() {
    this.multipleSlider.nativeElement.style.display = 'initial';
    this.singleSlider.nativeElement.style.display = 'none';
  }
  setDataAt() {
    this.multipleSlider.nativeElement.style.display = 'none';
    this.singleSlider.nativeElement.style.display = 'initial';
  }
  sliderOneChange(x: any) {
    this.rangeBullet0.nativeElement.innerHTML = this.lsttimeInterval[parseInt(this.slider1.nativeElement.value, 10)];
    const bulletPosition = +this.slider1.nativeElement.value / +this.slider1.nativeElement.max;
    this.rangeBullet0.nativeElement.style.left = bulletPosition * 580 + 'px';

    this.x = x;

    if (x > this.sldr2) {
      this.x = this.sldr2;
      this.y = this.sldr1;
      this.endTime = this.convertToTimeMul(this.y);
    }

    this.beginTime = this.convertToTimeMul(this.x);
    this.onChange(this.beginTime + ' - ' + this.endTime);
  }

  sliderTwoChange(y: any) {
    this.rangeBullet1.nativeElement.innerHTML = this.lsttimeInterval[parseInt(this.slider2.nativeElement.value, 10)];
    const bulletPosition = +this.slider2.nativeElement.value / +this.slider2.nativeElement.max;
    this.rangeBullet1.nativeElement.style.left = bulletPosition * 580 + 'px';

    this.y = y;
    if (y < this.sldr1) {
      this.x = this.sldr2;
      this.y = this.sldr1;
      this.beginTime = this.convertToTimeMul(this.x);
    }

    this.endTime = this.convertToTimeMul(this.y);

    this.onChange(this.beginTime + ' - ' + this.endTime);
  }

  convertToTimeMul(time: number) {
    let t: any;
    t = this.lsttimeInterval[time];
    return t;
  }
}
