import { createSelector, createFeatureSelector } from '@ngrx/store';

const getFlexusFeature = createFeatureSelector('dyn');

export const getVariable = (prop: any) => {
  return createSelector(
    getFlexusFeature,
    (state: any) => state && state?.variables[prop]
);

}
