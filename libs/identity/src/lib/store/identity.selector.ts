import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IdentityState } from './identity.reducer';

const getIdentityState = createFeatureSelector<IdentityState>('identity');

export const getCurrentUser = createSelector(
  getIdentityState,
  state => state.currentUser
);

export const getIsAuthenticated = createSelector(
  getIdentityState,
  state => state && state.isAuthenticated
);

export const getIdentitySubmitting = createSelector(
  getIdentityState,
  state => state.submitting
);
export const getIdentitySubmitted = createSelector(
  getIdentityState,
  state => state.submitted
);

export const getUserEditStates = createSelector(
  getCurrentUser,
  (currentUser: any) => (currentUser && currentUser.user ? currentUser.user.edit_states : [])
);
export const getUserFullName = createSelector(
  getCurrentUser,
  (currentUser: any) => (currentUser ? currentUser.user.full_name : '')
);

export const getUserStaffId = createSelector(
  getCurrentUser,
  (currentUser: any) => (currentUser && currentUser.user ? currentUser.user.id : null)
);
export const getUserStaffRoles = createSelector(
  getCurrentUser,
  (currentUser: any) => (currentUser ? currentUser.user.roles : null)
);

export const getUserToken = createSelector(
  getCurrentUser,
  (currentUser: any) => (currentUser && currentUser.token ? currentUser.token : null)
);

export const getUserStaffType = createSelector(
  getCurrentUser,
  (currentUser: any) => currentUser.user && currentUser.user.staff_type
);

export const getLoginError = createSelector(
  getIdentityState,
  state =>
    (state.error && state.error.error && state.error.error.errors) || (state && state.error && state.error.message)
  // state.error.error.errors.error[0]
);

export const getForgotPasswordError = createSelector(
  getIdentityState,
  state => (state.error ? state.error.error.message : null)
);

export const getForgotPasswordMessage = createSelector(
  getIdentityState,
  state => state.message
);
