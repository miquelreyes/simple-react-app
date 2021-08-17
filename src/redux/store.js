import { FETCH_REQUEST, FETCH_SUCCESS, FILTER } from '../constants';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    holidays: [],
    filtered: [],
    loading: false
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_SUCCESS:
            return {
                holidays: action.value,
                filtered: action.value,
                loading: false
            };
        case FILTER:
            let filteredHolidays = state.holidays.filter(holiday => holiday.name.toLowerCase().includes(action.value.toLowerCase()));
            return {
                ...state,
                filtered: filteredHolidays
            };
        default:
            return state;
    }
}

export default createStore(reducer, applyMiddleware(thunk));