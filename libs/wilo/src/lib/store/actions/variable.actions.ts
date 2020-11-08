
export enum actionTypes {
    SET_VARIABLE = 'SET_VARIABLE',
    ADD_FILTER = 'ADD_FILTER',
    REMOVE_FILTER = 'REMOVE_FILTER',
    RESET_FILTER = 'RESET_FILTER'
}



export const setVariable = (payload: {key: string, data: any}) => ({
    type: actionTypes.SET_VARIABLE,
    payload
});


export const addFilter = (payload: {key: string, filterKey: string}) => ({
    type: actionTypes.ADD_FILTER,
    payload
});


export const removeFilter = (payload: {key: string, filterKey: string}) => ({
    type: actionTypes.REMOVE_FILTER,
    payload
});

export const resetFilter = (payload: {key: string}) => ({
    type: actionTypes.RESET_FILTER,
    payload
});
