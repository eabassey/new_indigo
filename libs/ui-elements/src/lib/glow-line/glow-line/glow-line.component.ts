import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'flx-glow-line',
  templateUrl: './glow-line.component.html',
  styleUrls: ['./glow-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLXGlowLineComponent implements OnInit {
  private _color: string;
  private _size: string;
  private _margin: string;

  get arrayClasses() {
    return Object.values(this.styleClasses);
  }

  styleClasses = {
    colorClass: 'glow-line-default',
  };

  @Input()
  set color(color: string) {
    switch (color) {
      case 'default':
        this.styleClasses.colorClass = 'glow-line-default';
        break;
      case 'primary':
        this.styleClasses.colorClass = 'glow-line-primary';
        break;
      case 'primary-light':
        this.styleClasses.colorClass = 'glow-line-primary-light';
        break;
      case 'secondary':
        this.styleClasses.colorClass = 'glow-line-secondary';
        break;
      case 'secondary-light':
        this.styleClasses.colorClass = 'glow-line-secondary-light';
        break;
      case 'danger':
        this.styleClasses.colorClass = 'glow-line-danger';
        break;
      default:
        this.styleClasses.colorClass = 'glow-line-default';
        break;
    }
  }

  get color() {
    return this._color;
  }

  @Input()
  set margin(margin: string) {
    this._margin = margin || '0';
  }

  get margin() {
    return this._margin;
  }

  @Input()
  set size(size: string) {
    this._size = size;
  }

  get size() {
    return this._size || '100%';
  }

  constructor() {}

  ngOnInit() {}
}
