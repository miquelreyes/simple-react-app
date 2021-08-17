import { createStore } from 'redux';

function reducer(state = {holidays: [], filtered: [], loading: true}, action) {
    if (action.type === "loading") {
        return {
            ...state,
            loading: true
        };
    }

    if (action.type === "initialize") {
        return {
            holidays: action.value,
            filtered: action.value,
            loading: false
        };
    }
    if (action.type === "filter") {
        let filteredHolidays = state.holidays.filter(holiday => holiday.name.toLowerCase().includes(action.value.toLowerCase()));
        console.log(filteredHolidays);
        return {
            ...state,
            filtered: filteredHolidays
        };
    }

    return state;
}

export default createStore(reducer);