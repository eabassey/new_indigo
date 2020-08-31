import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DynamicButton, Position } from '../button-models';
import { Observable, of } from 'rxjs';
import { returnOrDefault } from '@indigo/utilities';
import { pluck, map, filter, tap } from 'rxjs/operators';

export enum ButtonSetOrganismSpacing {
  'space-around' = 'space-around',
  'space-between' = 'space-between',
  'center' = 'justify-center',
  'start' = 'justify-start',
  'end' = 'justify-end',
}

export enum ButtonSetOrganismLayout {
  vertical = 'vertical-flow',
  horizontal = 'horizontal-flow',
}

// TODO: add in styling for order, but it is currently complete enough that more is not really needed
export enum Order {
  'first' = 'order-first',
  'second' = 'order-second',
  'third' = 'order-third',
}
export interface FLXButtonSetOrganismData {
  buttons: Array<DynamicButton>;
}
export interface FLXButtonSetOrganismConfig {
  spacing?: ButtonSetOrganismSpacing;
  layout?: ButtonSetOrganismLayout;
}
export interface FLXButtonSetOrganismEvent {
  type: 'button-set-clicked';
  buttonClicked: DynamicButton;
  arrayIdx: number;
  name: string;
  event_type: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'flx-button-set-organism',
  templateUrl: './button-set.component.html',
  styleUrls: ['./button-set.component.scss'],
})
/**
 * used to render in a set of buttons into a container, the buttons wil generally speaking expand to fill the container. this uses the dynamic button interface
 */
export class FLXButtonSetOrganism implements OnInit, OnDestroy {
  private _data$: Observable<FLXButtonSetOrganismData>;
  private _config: FLXButtonSetOrganismConfig;
  private _laidOutButtons$: Observable<{
    left: Array<DynamicButton>;
    middle: Array<DynamicButton>;
    right: Array<DynamicButton>;
  }>;

  private readonly defaultConfig: FLXButtonSetOrganismConfig = {
    spacing: ButtonSetOrganismSpacing['space-around'],
    layout: ButtonSetOrganismLayout.horizontal,
  };
  @Input()
  set config(c: FLXButtonSetOrganismConfig) {
    this._config = { ...this.defaultConfig, ...c };
  }

  get containerClass() {
    // return this.config
    return {
      'button-set-button-container': true,
      [this.config.spacing]: true,
      [this.config.layout]: true,
    };
  }

  get config(): FLXButtonSetOrganismConfig {
    return returnOrDefault(this._config, this.defaultConfig);
  }

  @Input()
  set data$(d: Observable<FLXButtonSetOrganismData>) {
    this._data$ = d;
    this._laidOutButtons$ = d.pipe(
      filter((x) => !!x && !!x.buttons),
      pluck('buttons'),
      map<
        DynamicButton[],
        {
          left: any[];
          middle: any[];
          right: any[];
        }
      >((buttonArray) => {
        const ret = {
          left: [],
          middle: [],
          right: [],
        };
        // go through the array and create the three columns
        for (const entry of buttonArray) {
          switch (entry.dynamic_btn_position) {
            case Position.left: {
              ret.left.push(entry);
              break;
            }
            case Position.middle: {
              ret.middle.push(entry);
              break;
            }
            case Position.right: {
              ret.right.push(entry);
              break;
            }
          }
        }
        return ret;
      }),
    );
  }

  get laidOutButtons$() {
    return returnOrDefault(this._laidOutButtons$, of(undefined));
  }

  handleClick(clickedButton: DynamicButton, idxOfClick: number) {
    // this.outputData({
    //   arrayIdx: idxOfClick,
    //   buttonClicked: clickedButton,
    //   type: 'button-set-clicked',
    //   name: clickedButton.dynamic_btn_name,
    //   event_type: clickedButton.dynamic_btn_eventType,
    // });
  }

  getClass(button: DynamicButton) {
    return {
      'button-set-button': true,
    };
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
