import * as types from '../types';

const initialState = {
    holidays: {
        byId: []
    },
    text: "",
    loading: false
}

const holidaysReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_HOLIDAYS_START:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_HOLIDAYS_SUCCESS:
            return {
                ...state,
                holidays: {
                    ...state.holidays,
                    byId: action.holidays
                },
                
                loading: false
            };
        case types.UPDATE_SEARCH_TEXT:
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
}

export default holidaysReducer;