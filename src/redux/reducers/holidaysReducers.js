import * as types from '../types';

const initialState = {
    holidays: {
        byId: []
    },
    text: "",
    loading: false,
    showForm: false
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
        case types.LOADING_START:
            return {
                ...state,
                loading: true
            }
        case types.LOADING_END:
            return {
                ...state,
                loading: false
            }
        case types.ADD_HOLIDAY_SUCCESS:
            return {
                ...state,
                loading: false,
                holidays: {
                    ...state.holidays,
                    byId: [...state.holidays.byId, action.holiday]
                },
            }
        case types.UPDATE_SEARCH_TEXT:
            return {
                ...state,
                text: action.text
            };
        case types.TOGGLE_ADD_FORM:
            return {
                ...state,
                showForm: !state.showForm,
            };
        default:
            return state;
    }
}

export default holidaysReducer;