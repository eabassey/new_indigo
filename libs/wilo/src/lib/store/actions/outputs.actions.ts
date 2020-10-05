import { Action } from '@ngrx/store';

export enum outputsTypes {
  UPDATE_SUBMISSION_DATA = 'UPDATE_SUBMISSION_DATA'
}


export const updateSubmissionData = (payload: any) => ({
  type: outputsTypes.UPDATE_SUBMISSION_DATA,
  payload
});
