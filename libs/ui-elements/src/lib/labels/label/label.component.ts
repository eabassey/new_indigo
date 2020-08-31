import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'flx-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FLXLabelComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXLabelComponent implements OnInit {
  private _text?: string;

  @Input() text$: Observable<any>;

  @Input() set class(val: string) {
    switch (val) {
      default:
        this.sizeClass = 'medium';
        break;
      case 'small':
        this.sizeClass = 'small';
        break;
      case 'medium':
        this.sizeClass = 'medium';
        break;
      case 'large':
        this.sizeClass = 'large';
        break;
    }
  }
  @Input() set color(val: string) {
    switch (val) {
      default:
        this.colorClass = 'default-color';
        break;
      case 'info':
        this.colorClass = 'info';
        break;
      case 'warning':
        this.colorClass = 'warning';
        break;
      case 'danger':
        this.colorClass = 'danger';
        break;
      case 'success':
        this.colorClass = 'success';
        break;
    }
  }
  colorClass = '';
  sizeClass = '';
  label = '';
  constructor() {}

  ngOnInit() {}
}
