export enum ActionIconEnum {
  view = '/assets/icons/file.svg',
}

export interface ActionableTableAction {
  type: string;
  text: string;
  callback: string;
}
