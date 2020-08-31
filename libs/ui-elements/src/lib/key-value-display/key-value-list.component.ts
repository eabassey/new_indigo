import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isObject } from 'util';

export enum KeyValueAlignment {
  even = 'even',
  center = 'center',
  ends = 'ends'
}

export class KVLHeading {
  constructor(public headingString: string, public headingColour: string) {}
}

export type KeyValueListData = { [key: string]: boolean | string | number };
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'flx-key-value-list',
  templateUrl: './key-value-list.component.html',
  styleUrls: ['./key-value-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXKeyValueListComponent implements OnInit, OnDestroy {
  @Input() strapline: string = null;
  @Input() numbering: boolean;
  @Input() heading: string = null;

  @Input() heading$: Observable<string>;

  public config;
  private _align = '';
  private _width = '';
  private _itemMargin = '';
  private _color = '';
  private _text = '';
  private _headingColour = '';
  private _kvlHeading = null;

  public styleClasses = {
    alignClass: 'key-value-list--align-default',
    sizeClass: 'key-value-list--align-default',
    colorClass: 'key-value-list--color-default',
    headingColourClass: 'key-value-list--color-default',
    textStyle: 'key-value-list--text-default'
  };

  @Input() data$: Observable<KeyValueListData>;

  @Input() set width(val: string) {
    if (val) {
      this._width = `${val} auto`;
    } else {
      this.width = '';
    }
  }

  get width() {
    return this._width;
  }

  @Input()
  set itemMargin(val: string) {
    this._itemMargin = val;
  }

  get itemMargin() {
    return this._itemMargin;
  }

  @Input()
  set align(align: string) {
    switch (align) {
      case 'center':
        this.styleClasses.alignClass = 'key-value-list--align-default';
        break;
      case 'even':
        this.styleClasses.alignClass = 'key-value-list--align-even';
        break;
      case 'ends':
        this.styleClasses.alignClass = 'key-value-list--align-ends';
        break;
      case 'left':
        this.styleClasses.alignClass = 'key-value-list--align-left';
        break;
      default:
        this.styleClasses.alignClass = 'key-value-list--align-default';
    }
    this._align = align;
  }

  get align() {
    return this._align;
  }

  @Input() set colouredHeading(heading: KVLHeading) {
    this._kvlHeading = heading;
  }
  get colouredHeading() {
    return this._kvlHeading;
  }

  @Input()
  set color(clr: string) {
    switch (clr) {
      case 'primary':
        this.styleClasses.colorClass = 'key-value-list--color-primary';
        break;
      case 'secondary':
        this.styleClasses.colorClass = 'key-value-list--color-secondary';
        break;
      default:
        this.styleClasses.colorClass = 'key-value-list--color-default';
        break;
    }
    this._color = clr;
  }
  get color() {
    return this._color;
  }

  @Input() set size(val: string) {
    switch (val) {
      case 'extra-small':
        this.styleClasses.sizeClass = 'key-value-list--size-extra-small';
        break;
      case 'small':
        this.styleClasses.sizeClass = 'key-value-list--size-small';
        break;
      case 'medium':
        this.styleClasses.sizeClass = 'key-value-list--size-medium';
        break;
      case 'large':
        this.styleClasses.sizeClass = 'key-value-list--size-large';
        break;
      default:
        this.styleClasses.sizeClass = 'key-value-list--size-small';
        break;
    }
  }

  get size() {
    return this._align;
  }

  @Input()
  set textTransform(text: string) {
    console.log('object', text);
    switch (text) {
      case 'default':
        this.styleClasses.textStyle = 'key-value-list--text-default';
        break;
      case 'none':
        this.styleClasses.textStyle = 'key-value-list--text-none';
        break;
      default:
        this.styleClasses.textStyle = 'key-value-list--text-default';
        break;
    }
  }

  get arrClasses() {
    return Object.values(this.styleClasses);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  checkingObject(prop) {
    return prop instanceof Object && !Array.isArray(prop);
  }

  checkingArray(prop) {
    return Array.isArray(prop);
  }
  checkProp(prop): String {
    let propType = '';
    prop instanceof Object && !Array.isArray(prop)
      ? (propType = 'object')
      : Array.isArray(prop)
      ? (propType = 'array')
      : (propType = '');
    return propType;
  }
}
