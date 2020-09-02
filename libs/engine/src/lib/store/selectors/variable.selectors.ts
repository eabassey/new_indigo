import { createSelector, createFeatureSelector } from '@ngrx/store';

const getFlexusFeature = createFeatureSelector('dyn');

export const getVariable = (prop) => {
  return createSelector(
    getFlexusFeature,
    (state: any) => state && state?.variables[prop]
);

}
