import { outputsTypes } from '../actions/outputs.actions';


const initialState = {
  submissionData: null
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case outputsTypes.UPDATE_SUBMISSION_DATA: {
            const submissionData = action.payload;

            return {
                ...state,
                submissionData
            };
        }
        default:
            return state;
    }
}
