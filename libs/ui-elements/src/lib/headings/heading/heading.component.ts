import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'flx-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXHeadingComponent implements OnInit {
  private _size = '';
  private _align = '';
  private _margin = '';
  private _space = '';

  styleClasses = {
    sizeClass: 'heading--size-large',
    alignClass: 'align-left',
    color: 'heading--color-default',
    weight: 'heading--weight-normal',
    type: 'heading--type-page'
  };

  get classesArray() {
    return Object.values(this.styleClasses);
  }

  @Input() set margin(val: string) {
    this._margin = val;
  }

  get margin() {
    return this._margin;
  }

  @Input() set size(val: string) {
    switch (val) {
      case 'extra-small':
        this.styleClasses.sizeClass = 'heading--size-extra-small';
        break;
      case 'small':
        this.styleClasses.sizeClass = 'heading--size-small';
        break;
      case 'medium':
        this.styleClasses.sizeClass = 'heading--size-medium';
        break;
      case 'large':
        this.styleClasses.sizeClass = 'heading--size-large';
        break;
      case 'extraLarge':
        this.styleClasses.sizeClass = 'heading--size-extra-large';
        break;
      default:
        this.styleClasses.sizeClass = 'heading--size-large';
        break;
    }
  }

  get size() {
    return this._size;
  }

  @Input()
  set align(align: string) {
    switch (align) {
      case 'left':
        this.styleClasses.alignClass = 'align-left';
        break;
      case 'center':
        this.styleClasses.alignClass = 'align-center';
        break;
      case 'right':
        this.styleClasses.alignClass = 'align-right';
        break;
      default:
        this.styleClasses.alignClass = 'align-left';
        break;
    }
  }

  @Input()
  set color(color: string) {
    switch (color) {
      case 'default':
        this.styleClasses.color = 'heading--color-default';
        break;
      case 'primary':
        this.styleClasses.color = 'heading--color-primary';
        break;
      case 'secondary':
        this.styleClasses.color = 'heading--color-secondary';
        break;
      case 'sub-heading':
        this.styleClasses.color = 'heading--color-subheading';
        break;
      case 'alert':
        this.styleClasses.color = 'heading--color-alert';
        break;
      case 'success':
        this.styleClasses.color = 'heading--color-success';
        break;
      case 'danger':
        this.styleClasses.color = 'heading--color-danger';
        break;
      case 'scratch':
        this.styleClasses.color = 'heading--color-scratch';
        break;
      default:
        this.styleClasses.color = 'heading--color-default';
        break;
    }
  }

  @Input()
  set weight(weight: string) {
    switch (weight) {
      case 'normal':
        this.styleClasses.weight = 'heading--weight-normal';
        break;
      case 'bold':
        this.styleClasses.weight = 'heading--weight-bold';
        break;
      case 'light':
        this.styleClasses.weight = 'heading--weight-light';
        break;
      case 'extra-light':
        this.styleClasses.weight = 'heading--weight-extra-light';
        break;
    }
  }

  @Input()
  set type(type: string) {
    switch (type) {
      case 'page':
        this.styleClasses.type = 'heading--type-page';
        break;
      case 'form':
        this.styleClasses.type = 'heading--type-form';
        break;
      case 'creation':
        this.styleClasses.type = 'heading--type-creation';
        break;
      case 'paragraph':
        this.styleClasses.type = 'heading--type-paragraph';
        break;
      case 'no-margin':
        this.styleClasses.type = 'heading--type-no-margin';
        break;
      default:
        this.styleClasses.type = 'heading--type-page';
    }
  }

  get align() {
    return this._align;
  }

  ngOnInit() {
    // console.log(this.sizeClass);
  }
}
