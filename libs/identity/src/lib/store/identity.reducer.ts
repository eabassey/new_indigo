import * as identityActions from './identity.actions';

export interface IdentityState {
  currentUser: any;
  error: any;
  isAuthenticated: boolean;
  message: any;
  submitted: boolean;
  submitting: boolean;
}

const initialIdentityState: IdentityState = {
  currentUser: null,
  error: null,
  isAuthenticated: null,
  message: null,
  submitted: false,
  submitting: false
};

export function identityReducer(state: IdentityState = initialIdentityState, action: identityActions.identityActions) {
  switch (action.type) {
    // forgot password
    case identityActions.IdentityActionTypes.FORGOT_PASSWORD_SUCCESS: {
      return { ...state, message: action.payload, error: null };
    }
    case identityActions.IdentityActionTypes.RESET_FORGOT_PASSWORD: {
      return { ...initialIdentityState };
    }

    case identityActions.IdentityActionTypes.FORGOT_PASSWORD_FAIL: {
      return { ...state, error: action.payload, message: null };
    }
    case identityActions.IdentityActionTypes.LOGIN:
      const newPreLoginState = {
        ...state,
        submitting: true
      };
      return newPreLoginState;

    // login

    case identityActions.IdentityActionTypes.LOGIN_SUCCESS:
      const newState = {
        ...state,
        currentUser: action.payload,
        submitting: false,
        isAuthenticated: true
      };
      return newState;

    case identityActions.IdentityActionTypes.AZURE_LOGIN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        submitting: false,
        isAuthenticated: true
      };
    }

    case identityActions.IdentityActionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        submitting: false,
        isAuthenticated: false
      };

    case identityActions.IdentityActionTypes.GET_LOGGED_IN_USER_SUCCESS: {
      const newLoginState = {
        ...state,
        currentUser: action.payload,
        submitting: false,
        isAuthenticated: true
      };
      return newLoginState;
    }

    case identityActions.IdentityActionTypes.GET_LOGGED_IN_USER_SUCCESS_SILENTLY: {
      const newLoginState = {
        ...state,
        currentUser: action.payload,
        submitting: false,
        isAuthenticated: true
      };
      return newLoginState;
    }

    case identityActions.IdentityActionTypes.LOGOUT_SUCCESS:
      return initialIdentityState;

    default:
      return state;
  }
}
