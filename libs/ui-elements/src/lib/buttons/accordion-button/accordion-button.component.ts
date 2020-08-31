import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'flx-accordion-button',
  templateUrl: './accordion-button.component.html',
  styleUrls: ['./accordion-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXAccordionButtonComponent implements OnInit {
  private _color = '';
  private _disabled = false;
  private _title?: string;
  private _opened = '';
  private _iconColor = '';

  @Output() clicked = new EventEmitter();

  get arrClasses() {
    return Object.values(this.styleClasses);
  }

  styleClasses = {
    colorClass: 'accordButton--colour-default'
  };

  @Input()
  set color(color: string) {
    switch (color) {
      case 'primary':
        this.styleClasses.colorClass = 'accordButton--colour-primary';
        break;
      case 'default':
        this.styleClasses.colorClass = 'accordButton--colour-default';
        break;
      default:
        this.styleClasses.colorClass = 'accordButton--colour-default';
    }
    this._color = color;
  }

  get color() {
    return this._color;
  }

  @Input()
  set title(title: string) {
    this._title = title;
  }
  get title() {
    return this._title;
  }

  @Input()
  set iconColor(iconColor: string) {
    switch (iconColor) {
      case 'primary':
        this._iconColor = 'primary';
        break;
      default:
        this._iconColor = 'default';
    }
  }

  get iconColor() {
    return this._iconColor;
  }

  @Input()
  set arrow(open: string) {
    switch (open) {
      case 'down':
        this._opened = 'chevron-down';

        break;
      case 'up':
        this._opened = 'chevron-up';

        break;
      default:
        this._opened = 'chevron-up';
    }

    open = this._opened;
  }

  get arrow() {
    return this._opened;
  }

  ngOnInit(): void {}
}
