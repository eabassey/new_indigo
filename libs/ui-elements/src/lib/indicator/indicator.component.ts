import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'flx-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXIndicatorComponent implements OnInit {
  private _color = '';
  private _position = '';
  private _size = '';

  get arrClasses() {
    return Object.values(this.styleClasses);
  }

  styleClasses = {
    colorClass: 'indicator-color-blue',
    sizeClass: 'indicator-size-default',
    positionClass: 'indicator-position-left'
  };

  @Input()
  set color(color: string) {
    switch (color) {
      case 'blue':
        this.styleClasses.colorClass = 'indicator-color-blue';
        break;
      case 'green':
        this.styleClasses.colorClass = 'indicator-color-green';
        break;
      case 'orange':
        this.styleClasses.colorClass = 'indicator-color-orange';
        break;
      case 'purple':
        this.styleClasses.colorClass = 'indicator-color-purple';
        break;
      case 'pink':
        this.styleClasses.colorClass = 'indicator-color-pink';
        break;
      case 'red':
        this.styleClasses.colorClass = 'indicator-color-red';
        break;
      case 'yellow':
        this.styleClasses.colorClass = 'indicator-color-yellow';
        break;
      case 'grey':
        this.styleClasses.colorClass = 'indicator-color-grey';
        break;
      default:
        this.styleClasses.colorClass = 'indicator-color-blue';
    }
    this._color = color;
  }
  get color() {
    return this._color;
  }

  @Input() set position(p: string) {
    switch (p) {
      case 'left':
        this.styleClasses.positionClass = 'indicator-position-left';
        break;
      case 'right':
        this.styleClasses.positionClass = 'indicator-position-right';
        break;
    }
  }

  @Input() set size(s: string) {
    switch (s) {
      case 'default':
        this.styleClasses.sizeClass = 'indicator-size-default';
        break;
      case 'small':
        this.styleClasses.sizeClass = 'indicator-size-small';
        break;
    }
  }

  @ViewChild('indicator', { static: false }) indicator: ElementRef;

  constructor() {}

  ngOnInit() {}
}
