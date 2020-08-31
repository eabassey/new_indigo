import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'flx-svg-button',
  templateUrl: './svg-button.component.html',
  styleUrls: ['./svg-button.component.scss'],
})
export class FLXSvgButtonComponent implements OnInit {
  @Input() type = 'document';

  constructor() {}

  ngOnInit() {}
}
