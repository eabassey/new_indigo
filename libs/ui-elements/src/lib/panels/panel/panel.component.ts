import { Component, Input, ElementRef, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flx-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLXPanelComponent {
  private _maxWidth = 'none';
  private _minWidth = 'none';
  private _margin = '0';
  private _alignItems = '';
  private _width = '';
  private _justifyContent = '';

  styleClasses = {
    densityClass: 'cozy',
    shadowClass: 'no-shadow',
    bgClass: 'no-bg',
  };

  get classesArray() {
    return Object.values(this.styleClasses);
  }

  @Input() set hasBackground(value: string) {
    switch (value) {
      case 'true':
        this.styleClasses.bgClass = 'has-bg';
        break;
      case 'false':
        this.styleClasses.bgClass = 'no-bg';
        break;
      default:
        this.styleClasses.bgClass = 'no-bg';
        break;
    }
  }

  @Input() set alignItems(value: string) {
    this._alignItems = value;
  }

  get alignItems() {
    return this._alignItems;
  }

  @Input() set justifyContent(value: string) {
    this._justifyContent = value;
  }

  get justifyContent() {
    return this._justifyContent;
  }

  @Input() set maxWidth(maxWidth: string) {
    this._maxWidth = maxWidth;
  }

  get maxWidth() {
    return this._maxWidth;
  }

  @Input() set minWidth(minWidth: string) {
    this._minWidth = minWidth;
  }

  get minWidth() {
    return this._minWidth;
  }

  @Input() set margin(value: string) {
    value === 'auto' ? (this._margin = '0 auto') : (this._margin = `${value}px`);
  }

  get margin() {
    return this._margin;
  }

  @Input() set density(value: string) {
    switch (value) {
      case 'default':
        this.styleClasses.densityClass = 'flx-ui-panel-default';
        break;
      case 'cozy':
        this.styleClasses.densityClass = 'flx-ui-panel-cozy';
        break;
      case 'compact':
        this.styleClasses.densityClass = 'flx-ui-panel-compact';
        break;
      default:
        this.styleClasses.densityClass = 'flx-ui-panel-default';
    }
  }

  @Input() set shadow(shadow: string) {
    if (shadow === 'true') {
      this.styleClasses.shadowClass = 'shadow';
    } else {
      this.styleClasses.shadowClass = 'no-shadow';
    }
  }

  @Input()
  set width(val: any) {
    this._width = val;
  }

  get width() {
    return this._width;
  }

  // constructor(private elementRef: ElementRef) {}

  // ngOnInit() {
  //   if (this.width) {
  //     this.elementRef.nativeElement.style.width = this.width;
  //   }

  //   if (this.maxWidth) {
  //     this.elementRef.nativeElement.style.maxWidth = this.maxWidth;
  //     this.elementRef.nativeElement.style.width = '100%';
  //   }
  // }
}
