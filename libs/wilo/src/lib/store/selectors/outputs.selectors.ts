import { createSelector, createFeatureSelector } from '@ngrx/store';

const getFlexusFeature = createFeatureSelector('dyn');

export const getSubmissionData = createSelector(
  getFlexusFeature,
  (state: any) => state?.outputs?.submissionData
);
