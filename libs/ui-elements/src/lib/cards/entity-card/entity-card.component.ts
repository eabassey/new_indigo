import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EntityCardState, EntityData } from './models';

@Component({
  selector: 'flx-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FLXEntityCardComponent implements OnInit {
  constructor() {}

  @Input() data$: EntityData;

  getIndicatorColor(state: EntityCardState) {
    // (state);
    switch (state) {
      case EntityCardState.danger:
        return 'red';
      case EntityCardState.info:
        return 'green';
      case EntityCardState.success:
        return 'green';
      case EntityCardState.warning:
        return 'orange';
      default:
        return 'grey';
    }
  }

  getTypeIcon(type: EntityCardState) {
    switch (type) {
      case EntityCardState.danger:
        return '/assets/icons/cancel.svg';
      case EntityCardState.info:
        return '/assets/icons/info.svg';
      case EntityCardState.success:
        return '/assets/icons/check_circle.svg';
      case EntityCardState.warning:
        return '/assets/icons/warning.svg';
      default:
        return '';
    }
  }

  ngOnInit() {}
}
