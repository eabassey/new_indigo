export enum EntityCardState {
  info = 'entity-card--info',
  danger = 'entity-card--danger',
  warning = 'entity-card--warning',
  success = 'entity-card--success',
  default = 'entity-card--default',
}

export interface EntityData {
  entityId: number;
  cardStateInfo: EntityCardStateInformation;
  columns: EntityColumnData[];
}

export interface EntityColumnData {
  title: string;
  subTitle: string;
  description: string;
}

export interface EntityCardStateInformation {
  state: EntityCardState;
  blurb: string;
}

export interface EntityCardActionInformation {
  isActionable: boolean;
  action: any;
}
