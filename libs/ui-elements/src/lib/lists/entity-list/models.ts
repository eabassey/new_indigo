import { DefaultOrganismConfig } from '../../parents/parent-organisms/parent-organism.component';
import { FormGroup } from '@angular/forms';
import { EntityListEventTypes } from '../list-interfaces';
import { EntityData } from '../../cards/entity-card/models';

export interface EntityListConfig extends DefaultOrganismConfig {
  parentForm: FormGroup;
  alwaysEmitEvent?: boolean;
}

export interface EntityListData {
  entities: EntityData[];
}

export interface EntityListAlert {
  title: string;
  message: string;
  type: string;
}

export interface EntityListEvent {
  type: EntityListEventTypes.EntitySelected;
  payload: any;
}
