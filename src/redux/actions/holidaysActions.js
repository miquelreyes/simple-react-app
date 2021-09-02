import * as types from '../types';

export const fetchHolidaysRequest = () => {
    return {
        type: types.FETCH_HOLIDAYS_REQUEST
    }
}

export const fetchHolidaysStart = () => {
    return {
        type: types.FETCH_HOLIDAYS_START
    }
}

export const fetchHolidaysSuccess = (holidays) => {
    return {
        type: types.FETCH_HOLIDAYS_SUCCESS,
        holidays
    }
}

export const updateSearchText = (text) => {
    return {
        type: types.UPDATE_SEARCH_TEXT,
        text
    }
}