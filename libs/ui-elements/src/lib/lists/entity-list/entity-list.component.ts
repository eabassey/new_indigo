import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityListConfig } from './models';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { EntityData, EntityCardState } from '../../cards/entity-card';
import { EntityListEventTypes } from '../list-interfaces';

@Component({
  selector: 'flx-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class FLXEntityListComponent implements OnInit {
  d: Observable<EntityData[]>;
  @Output() outputData = new EventEmitter<any>();

  private alwaysEmit = false;

  // ================================ config ===================================
  @Input() set config(c: EntityListConfig) {
    if (c.alwaysEmitEvent !== undefined) {
      this.alwaysEmit = c.alwaysEmitEvent;
    }
  }

  // ================================== data ===================================
  @Input() set data$(d: Observable<EntityData[]>) {
    this.d = d;
  }

  bubbleEvent(e) {
    this.outputData.emit(e);
  }

  entitySelected(entity: EntityData) {
    if (this.alwaysEmit === true || entity.cardStateInfo.state === EntityCardState.success) {
      this.outputData.emit({
        type: EntityListEventTypes.EntitySelected,
        payload: entity,
      });
    }
  }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
