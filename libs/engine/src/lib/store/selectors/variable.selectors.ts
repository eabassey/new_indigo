import { createSelector, createFeatureSelector } from '@ngrx/store';

const getFlexusFeature = createFeatureSelector('dyn'); 

export const getVariables = createSelector(
    getFlexusFeature,
    (state: any) => state && state.variables
);
