import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IconTypes } from '../../inline-icons/icon-types';

@Component({
  selector: 'flx-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXAlertComponent implements OnInit {
  private _title!: string;
  private _message!: string;
  private _type = 'primary';

  styleClasses = {
    typeclass: 'flx-alert-primary'
  };

  @Input()
  set title(title: string) {
    this._title = title;
  }

  get title() {
    return this._title;
  }
  @Input() iconColor = 'primary';
  @Input() iconType: IconTypes = 'alert';

  @Input() missingItem = 'items';

  @Input()
  set message(msg: string) {
    this._message = msg;
  }
  get message() {
    return this._message;
  }

  @Input()
  set type(type: string) {
    switch (type) {
      case 'primary':
        this.styleClasses.typeclass = 'flx-alert-primary';
        this.iconColor = 'primary';
        break;
      case 'secondary':
        this.styleClasses.typeclass = 'flx-alert-secondary';
        this.iconColor = 'secondary';
        break;
      case 'success':
        this.styleClasses.typeclass = 'flx-alert-success';
        break;
      case 'danger':
        this.styleClasses.typeclass = 'flx-alert-danger';
        this.iconColor = 'danger';
        break;
      case 'warning':
        this.styleClasses.typeclass = 'flx-alert-warning';
        break;
      case 'no-info':
        this.styleClasses.typeclass = 'flx-alert-primary';
        this.iconType = 'information';
        break;
      default:
        this.styleClasses.typeclass = 'flx-alert-primary';
    }
    this._type = type;
  }
  get type() {
    return this._type;
  }
  constructor() {}

  ngOnInit() {}
}
