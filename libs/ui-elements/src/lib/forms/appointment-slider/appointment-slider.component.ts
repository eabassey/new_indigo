import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'flx-appointment-slider',
  templateUrl: './appointment-slider.component.html',
  styleUrls: ['./appointment-slider.component.scss'],
})
export class FLXAppointmentSliderComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  // rangeSlider = document.getElementById('rs-range-line');
  // rangeBullet = document.getElementById('rs-bullet');
  @ViewChild('rsRangeLine', { static: true }) rangeSlider: ElementRef<HTMLInputElement>;
  @ViewChild('rsBullet', { static: true }) rangeBullet;
  @ViewChild('searchDD', { static: true }) select;
  onTouch;
  onChange;
  @ViewChild('slider1', { static: true }) slider1: ElementRef;
  @ViewChild('slider2', { static: true }) slider2: ElementRef;
  @ViewChild('multipleSlider', { static: true }) multipleSlider: ElementRef;
  @ViewChild('singleSlider', { static: true }) singleSlider: ElementRef;
  sldr1: number;
  sldr2: number;
  x: number;
  y: number;
  beginTime: any;
  endTime: any;
  text = '';

  // checkboxStat = document.querySelector('.-webkit-slider-thumb');

  // document.body.className = 'fade';

  /* Changing the arrow on click */
  // valueSelect = document.getElementById('searchDD');

  /* this might need to go into 'whatvalue' */
  // thumbs = document.querySelectorAll('.rs-range');

  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.rangeBullet.nativeElement.value = '9';

    // tslint:disable-next-line: radix
    this.sldr1 = parseInt(this.slider1.nativeElement.value);
    // tslint:disable-next-line: radix
    this.sldr2 = parseInt(this.slider2.nativeElement.value);

    this.x = this.sldr1;
    this.y = this.sldr2;

    this.beginTime = this.convertToTimeMul(this.x);
    this.endTime = this.convertToTimeMul(this.y);
  }

  ngAfterViewInit() {
    // rangeSlider.addEventListener('input', showSliderValue, false);
    this.start();
    // this.whatValue();
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
    this.convertToTime(t);
  }

  convertToTime(time) {
    // console.log('we here');
    const t = this.rangeSlider.nativeElement.value;
    switch (t) {
      case '0': {
        time = '09h00';
        break;
      }
      case '1': {
        time = '09h30';
        break;
      }
      case '2': {
        time = '10h00';
        break;
      }
      case '3': {
        time = '10h30';
        break;
      }
      case '4': {
        time = '11h00';
        break;
      }
      case '5': {
        time = '11h30';
        break;
      }
      case '6': {
        time = '12h00';
        break;
      }
      case '7': {
        time = '12h30';
        break;
      }
      case '8': {
        time = '13h00';
        break;
      }
      case '9': {
        time = '13h30';
        break;
      }
      case '10': {
        time = '14h00';
        break;
      }
      case '11': {
        time = '14h30';
        break;
      }
      case '12': {
        time = '15h00';
        break;
      }
      case '13': {
        time = '15h30';
        break;
      }
      case '14': {
        time = '16h00';
        break;
      }
      case '15': {
        time = '16h30';
        break;
      }
      case '16': {
        time = '17h00';
        break;
      }
      case '17': {
        time = '17h30';
        break;
      }
    }

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
    // console.log('in what value now');
    const x = this.select.nativeElement.value;
    // console.log('calling value with value ' + x);
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
    }

    this.displayAll(displayText);
  }

  displayAll(BAB) {
    // console.log('Displaying time and when');
    // console.log(this.text);
    this.text = BAB + ' ' + this.rangeBullet.nativeElement.innerHTML;
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
    // console.log('set time between the two');
  }

  constructor() {}

  sliderOneChange(x: any) {
    this.x = x;

    if (x > this.sldr2) {
      this.x = this.sldr2;
      this.y = this.sldr1;
      this.endTime = this.convertToTimeMul(this.y);
    }

    this.beginTime = this.convertToTimeMul(this.x);
  }

  sliderTwoChange(y: any) {
    this.y = y;
    if (y < this.sldr1) {
      this.x = this.sldr2;
      this.y = this.sldr1;
      this.beginTime = this.convertToTimeMul(this.x);
    }

    this.endTime = this.convertToTimeMul(this.y);
  }

  convertToTimeMul(time: number) {
    let t: any;
    switch (time) {
      case 1:
        t = '09h00';
        break;
      case 2:
        t = '09h30';
        break;
      case 3:
        t = '10h00';
        break;
      case 4:
        t = '10h30';
        break;
      case 5:
        t = '11h00';
        break;
      case 6:
        t = '11h30';
        break;
      case 7:
        t = '12h00';
        break;
      case 8:
        t = '12h30';
        break;
      case 9:
        t = '13h00';
        break;
      case 10:
        t = '13h30';
        break;
      case 11:
        t = '14h00';
        break;
      case 12:
        t = '14h30';
        break;
      case 13:
        t = '15h00';
        break;
      case 14:
        t = '15h30';
        break;
      case 15:
        t = '16h00';
        break;
      case 16:
        t = '16h30';
        break;
      case 17:
        t = '17h00';
        break;
      case 18:
        t = '17h30';
        break;
    }
    return t;
  }
}
