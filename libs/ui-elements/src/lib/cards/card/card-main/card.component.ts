import { Component, OnInit, Input } from '@angular/core';
import { FLXCardOrientation } from '../card-header/card-header.component';
import { returnOrDefault } from '@indigo/utilities';

export type ExpansionToggleLocations = { [D in FLXCardClickLocation]?: boolean };
// flx-card-
export enum FLXCardFlavour {
  standard = 'standard',
  success = 'success',
  warn = 'warn',
  danger = 'danger',
  info = 'info'
}

export enum FLXCardExpansionLocation {
  beforeBody = 'before-body',
  afterBody = 'after-body'
}

export enum FLXCardClickLocation {
  main = 'main',
  header = 'header',
  body = 'body',
  expansion = 'expansion',
  footer = 'footer'
}

export interface FLXCardConfig {
  flavour?: FLXCardFlavour;
  orientation?: FLXCardOrientation;
  expandable?: boolean;
  expansionLocation?: FLXCardExpansionLocation;
  startExpanded?: boolean;
  expansionToggles?: ExpansionToggleLocations;
}

@Component({
  selector: 'flx-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class FLXCardComponent {
  private static defaultConfig: FLXCardConfig = {
    flavour: FLXCardFlavour.standard,
    orientation: FLXCardOrientation.vertical,
    expandable: true,
    expansionLocation: FLXCardExpansionLocation.afterBody,
    expansionToggles: {
      main: false,
      header: true,
      body: true,
      expansion: true,
      footer: false
    }
  };

  get cardClickLocation() {
    return FLXCardClickLocation;
  }

  private _config!: FLXCardConfig;

  @Input() set config(c: FLXCardConfig) {
    this._config = { ...FLXCardComponent.defaultConfig, ...c };
    this._expanded = this.config.startExpanded;
  }
  get config() {
    return returnOrDefault(this._config, FLXCardComponent.defaultConfig);
  }

  private _expanded: boolean | undefined;

  get expanded() {
    return !!this._expanded;
  }

  @Input()
  set expanded(e: boolean) {
    if (this.config.expandable === false) {
      return;
    }
    this._expanded = e;
  }

  get mainCardClass() {
    return { 'flx-card-main': true, [`flx-card-${this.config.flavour}`]: true };
  }

  handleClick(origin: FLXCardClickLocation) {
    // if (this._config && this._config.expansionToggles[origin] === true) {
    //   this._expanded = !this._expanded;
    // }
  }

  ngOnInit() {}
}
