import { ADD_ERROR, REMOVE_ERROR, REMOVE_ALL_ERRORS } from './error-handler.actions';

interface State {
  errors: any;
}

const initialState: State = {
  errors: {}
};

export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_ERROR: {
      const err = action.payload;
      return {
        ...state,
        errors: { ...state.errors, [err.dataKey]: err }
      };
    }
    case REMOVE_ERROR: {
      const dataKey = action.payload.dataKey;
      if (!dataKey) {
        return state;
      }
      if (!state.errors[dataKey]) {
        return state;
      }
      delete state.errors[dataKey];
      return {
        ...state,
        errors: { ...state.errors }
      };
    }
    case REMOVE_ALL_ERRORS: {
      return {
        ...state,
        errors: {}
      };
    }
    case 'LOGOUT_SUCCESS': {
      return initialState;
    }
    default:
      return state;
  }
}
