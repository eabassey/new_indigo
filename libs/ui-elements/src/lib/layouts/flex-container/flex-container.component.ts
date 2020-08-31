import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'flx-flex-container',
  templateUrl: './flex-container.component.html',
  styleUrls: ['./flex-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FLXFlexContainerComponent {
  styleClasses = {
    direction: 'direction-column',
    alignItems: 'align--items-normal',
    justifyContent: 'justify--items-normal',
  };

  private _maxWidth = '100%';
  private _margin = '0 auto';

  @Input() set maxWidth(width: string) {
    if (width) {
      this._maxWidth = width;
    }
  }

  get maxWidth() {
    return this._maxWidth;
  }

  @Input() set margin(margin: string) {
    if (margin) {
      this._margin = margin;
    }
  }

  get margin() {
    return this._margin;
  }

  get classesArray() {
    return Object.values(this.styleClasses);
  }

  @Input() set direction(val: string) {
    switch (val) {
      case 'row':
        this.styleClasses.direction = 'direction-row';
        break;
      case 'column':
        this.styleClasses.direction = 'direction-column';
        break;
      default:
        this.styleClasses.direction = 'direction-column';
    }
  }

  @Input() set alignItems(val: string) {
    switch (val) {
      case 'normal':
        this.styleClasses.alignItems = 'align--items-normal';
        break;
      case 'stretch':
        this.styleClasses.alignItems = 'align--items-stretch';
        break;
      case 'center':
        this.styleClasses.alignItems = 'align--items-center';
        break;
      case 'start':
        this.styleClasses.alignItems = 'align--items-start';
        break;
      case 'end':
        this.styleClasses.alignItems = 'align--items-end';
        break;
      case 'flex-start':
        this.styleClasses.alignItems = 'align--items-flex-start';
        break;
      case 'flex-end':
        this.styleClasses.alignItems = 'align--items-flex-end';
        break;
      case 'self-start':
        this.styleClasses.alignItems = 'align--items-self-start';
        break;
      case 'self-end':
        this.styleClasses.alignItems = 'align--items-self-start';
        break;
      case 'baseline':
        this.styleClasses.alignItems = 'align--items-baseline';
        break;
      case 'inherit':
        this.styleClasses.alignItems = 'align--items-inherit';
        break;
      case 'initial':
        this.styleClasses.alignItems = 'align--items-initial';
        break;
      case 'unset':
        this.styleClasses.alignItems = 'align--items-unset';
        break;
      default:
        this.styleClasses.alignItems = 'align--items-normal';
        break;
    }
  }

  @Input() set justifyContent(val: string) {
    switch (val) {
      case 'center':
        this.styleClasses.justifyContent = 'justify--content-center';
        break;
      case 'start':
        this.styleClasses.justifyContent = 'justify--content-start';
        break;
      case 'end':
        this.styleClasses.justifyContent = 'justify--content-end';
        break;
      case 'flex-start':
        this.styleClasses.justifyContent = 'justify--content-flex-start';
        break;
      case 'flex-end':
        this.styleClasses.justifyContent = 'justify--content-flex-end';
        break;
      case 'left':
        this.styleClasses.justifyContent = 'justify--content-left';
        break;
      case 'right':
        this.styleClasses.justifyContent = 'justify--content-right';
        break;
      case 'normal':
        this.styleClasses.justifyContent = 'justify--content-normal';
        break;
      case 'space-between':
        this.styleClasses.justifyContent = 'justify--content-space-between';
        break;
      case 'space-around':
        this.styleClasses.justifyContent = 'justify--content-space-around';
        break;
      case 'space-evenly':
        this.styleClasses.justifyContent = 'justify--content-space-evenly';
        break;
      case 'stretch':
        this.styleClasses.justifyContent = 'justify--content-stretch';
        break;
      case 'inherit':
        this.styleClasses.justifyContent = 'justify--content-inherit';
        break;
      case 'initial':
        this.styleClasses.justifyContent = 'justify--content-initial';
        break;
      case 'unset':
        this.styleClasses.justifyContent = 'justify--content-unset';
        break;
    }
  }
}
