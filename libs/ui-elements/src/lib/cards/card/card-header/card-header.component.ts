import { Component, OnInit, Input } from '@angular/core';
import { config } from 'rxjs';
import { returnOrDefault } from '@indigo/utilities';

export enum FLXCardOrientation {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export interface FLXCardHeaderConfig {
  title?: string;
  subTitle?: string;
  display?: FLXCardOrientation;
}

@Component({
  selector: 'flx-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class FLXCardHeaderComponent implements OnInit {
  private _config: FLXCardHeaderConfig;
  @Input() set config(c: FLXCardHeaderConfig) {
    this._config = {
      display: FLXCardOrientation.vertical,
      ...c
    };
  }

  get config() {
    return returnOrDefault(this._config, { display: FLXCardOrientation.vertical });
  }

  get cardHeaderClassObj() {
    return {
      'card-header': true,
      [`card-header-${this.config.display}`]: true
    };
  }

  constructor() {}

  ngOnInit() {}
}
