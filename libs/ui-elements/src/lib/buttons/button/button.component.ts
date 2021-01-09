import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { returnOrDefault } from '@indigo/utilities';

@Component({
  selector: 'flx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class FLXButtonComponent implements OnInit, OnChanges {
  private _color = '';
  private _size = '';
  private _rounded = true;
  private _display = '';
  private _visible = true;
  private _selected = '';
  private _disabled = false;
  private _tabIndex = -1;
  private _maxWidth!: any;
  private _align = 'center';
  private _title?: string;
  private _margin?: string;
  private _mustDisableOnLoad = false;

  public arrClasses!: string[];
  public isLoading$!: Observable<boolean>;

  @Output() clicked = new EventEmitter();

  styleClasses = {
    colorClass: 'button--colour-default',
    sizeClass: 'button--size-default',
    roundedClass: 'button--shape-rounded',
    depthClass: '',
    displayClass: '',
    visibleClass: '',
    shapeClass: ''
  };

  @Input()
  set title(title: string) {
    this._title = title;
  }
  get title() {
    return this._title as string;
  }

  @Input()
  set disableOnLoad(mustDisable: boolean) {
    if (mustDisable !== null && mustDisable !== undefined) {
      this._mustDisableOnLoad = mustDisable;
    }
  }
  get disableOnLoad() {
    return this._mustDisableOnLoad;
  }

  @Input()
  set margin(value: string) {
    this._margin = value;
  }
  get margin() {
    return this._margin as string;
  }

  // Button Color
  @Input()
  set color(color: string) {
    switch (color) {
      case 'default':
        this.styleClasses.colorClass = 'button--colour-default';
        break;
      case 'primary':
        this.styleClasses.colorClass = 'button--colour-primary';
        break;
      case 'secondary':
        this.styleClasses.colorClass = 'button--colour-secondary';
        break;
      case 'success':
        this.styleClasses.colorClass = 'button--colour-success';
        break;
      case 'alert':
        this.styleClasses.colorClass = 'button--colour-alert';
        break;
      case 'warn':
        this.styleClasses.colorClass = 'button--colour-warn';
        break;
      case 'danger':
        this.styleClasses.colorClass = 'button--colour-danger';
        break;
      case 'toggle':
        this.styleClasses.colorClass = 'button--colour-toggle';
        break;
      default:
        this.styleClasses.colorClass = 'button--colour-default';
    }
    this._color = color;
  }
  get color() {
    return this._color;
  }

  @Input()
  set visible(visible: boolean) {
    if (visible) {
      this.styleClasses.visibleClass = '';
    } else {
      this.styleClasses.visibleClass = 'button--display-none';
    }
  }
  get visible() {
    return this._visible;
  }

  // Button Size
  @Input()
  set size(size: string) {
    switch (size) {
      case 'default':
        this.styleClasses.sizeClass = 'button--size-default';
        break;
      case 'small':
        this.styleClasses.sizeClass = 'button--size-small';
        break;
      case 'medium':
        this.styleClasses.sizeClass = 'button--size-medium';
        break;
      case 'large':
        this.styleClasses.sizeClass = 'button--size-large';
        break;
      default:
        this.styleClasses.sizeClass = 'button--size-default';
    }
  }
  get size() {
    return this._size;
  }

  // Button Shape
  @Input()
  set rounded(rounded: boolean) {
    if (!rounded) {
      this.styleClasses.roundedClass = '';
    } else {
      this.styleClasses.roundedClass = 'button--shape-rounded';
    }
  }
  get rounded() {
    return this._rounded;
  }

  @Input()
  set align(value: string) {
    this._align = value;
  }

  get align() {
    return this._align;
  }

  // Button Width
  @Input()
  set display(display: string) {
    switch (display) {
      case 'block':
        this.styleClasses.displayClass = 'button--display-block';
        this.maxWidth = -1;
        break;
      case 'inline':
        this.styleClasses.displayClass = 'button--display-inline';
        this.maxWidth = -1;
        break;
      default:
        this.styleClasses.displayClass = 'button--display-inline';
    }
  }
  get width() {
    return this._display;
  }

  // Button Selected
  @Input()
  set selected(selected: string) {}
  get selected() {
    return this._selected;
  }

  // Button Disabled

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled;
  }
  get disabled() {
    return this._disabled;
  }

  @Input()
  set tabIndex(tabIndex: number) {
    this._tabIndex = tabIndex;
  }
  get tabIndex() {
    return this._tabIndex;
  }

  @Input()
  set maxWidth(maxWidth: number) {
    this._maxWidth = maxWidth;
  }
  get maxWidth() {
    return this._maxWidth;
  }

  private _allCaps!: boolean;
  @Input()
  set allCaps(caps: boolean) {
    this._allCaps = caps;
  }
  get allCaps() {
    return returnOrDefault(this._allCaps, true);
  }

  constructor(private _store: Store<any>) {}

  ngOnInit() {
    this.arrClasses = Object.values(this.styleClasses);
    if (this.disableOnLoad) {
      // this.isLoading$ = this._store.select(getLoadingState);
    } else {
      this.isLoading$ = of(false);
    }
  }

  ngOnChanges() {
    this.arrClasses = Object.values(this.styleClasses);
  }
}
