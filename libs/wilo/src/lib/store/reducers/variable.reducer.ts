import { actionTypes } from '../actions/variable.actions';
import {clone} from 'ramda';


const initialState = {}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_VARIABLE: {
            const {key, data} = action.payload;
            const val = clone(data);
            if (state[key]?.filterBy) {
              val.filterBy = state[key]?.filterBy;
            }
            if (state[key]?.sortBy) {
              val.sortBy = state[key]?.sortBy;
            }
            return {
                ...state,
                [key]: val
            };
        }
        case actionTypes.ADD_FILTER: {
            const {key, filter} = action.payload;
            return {
                ...state,
                [key]: {
                    ...state[key],
                    filterBy: {
                        ...state[key].filterBy,
                        ...filter
                    }
                }
            };
        }
        case actionTypes.REMOVE_FILTER: {
            const {key, filterKey} = action.payload;
            const filterBy = state[key].filterBy;
            delete filterBy[filterKey];
            return {
                ...state,
                [key]: {
                    ...state[key],
                    filterBy
                }
            };
        }
        case actionTypes.RESET_FILTER: {
            const {key} = action.payload;
            return {
                ...state,
                [key]: {
                    ...state[key],
                    filterBy: {}
                }
            };
        }
        default:
            return state;
    }
}
