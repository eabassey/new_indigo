import { createFeatureSelector, createSelector } from '@ngrx/store';

const errorHandlerState = createFeatureSelector('errorHandler');

export const getErrors = createSelector(
  errorHandlerState,
  (state: any) => state.errors,
);
