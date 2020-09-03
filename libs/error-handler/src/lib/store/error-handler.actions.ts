import { Action } from '@ngrx/store';

export const ADD_ERROR = 'ADD ERROR';
export const REMOVE_ERROR = 'REMOVE ERROR';
export const REMOVE_ALL_ERRORS = 'REMOVE_ALL_ERRORS';

export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(
    public payload: {
      dataKey: string;
      error: any;
      errorMessage: string;
      retryCall: any;
      data?: any;
    }
  ) {}
}

export class RemoveError implements Action {
  readonly type = REMOVE_ERROR;
  constructor(public payload: { dataKey: string }) {}
}

export class RemoveAllErrors implements Action {
  readonly type = REMOVE_ALL_ERRORS;
  constructor() {}
}
