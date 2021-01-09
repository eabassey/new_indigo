/*
 * Purpose: General purpose button group
 */

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'flx-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
})
export class FLXButtonGroupComponent implements OnInit {
  private _group = '';

  groupClass = '';

  @Input()
  set group(group: string) {
    switch (group) {
      case 'default':
        this.groupClass = 'flx-button-group-default';
        break;
      default:
        this.groupClass = '';
    }
    this._group = group;
  }
  get btngroup() {
    return this._group;
  }

  constructor() {}

  ngOnInit() {}
}
