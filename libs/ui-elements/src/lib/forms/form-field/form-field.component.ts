import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'flx-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FLXFormFieldComponent implements OnInit {
  @Input() margin = '0 0 0.5rem 0';
  @Input() maxWidth = 'auto';

  constructor() {}

  ngOnInit() {}
}
