import * as types from "../types";

export const fetchHolidaysRequest = () => {
	return {
		type: types.FETCH_HOLIDAYS_REQUEST,
	};
};

export const fetchHolidaysStart = () => {
	return {
		type: types.FETCH_HOLIDAYS_START,
	};
};

export const fetchHolidaysSuccess = holidays => {
	return {
		type: types.FETCH_HOLIDAYS_SUCCESS,
		holidays,
	};
};

export const fetchHolidaysError = () => {
	return {
		type: types.FETCH_HOLIDAYS_ERROR,
	};
};

export const addHolidayRequest = holiday => {
	return {
		type: types.ADD_HOLIDAY_REQUEST,
		holiday,
	};
};

export const addHolidaySuccess = holiday => {
	return {
		type: types.ADD_HOLIDAY_SUCCESS,
		holiday,
	};
};

export const updateSearchText = text => {
	return {
		type: types.UPDATE_SEARCH_TEXT,
		text,
	};
};

export const loadingStart = () => {
	return {
		type: types.LOADING_START,
	};
};

export const loadingEnd = () => {
	return {
		type: types.LOADING_END,
	};
};

export const toggleAddForm = () => {
	return {
		type: types.TOGGLE_ADD_FORM,
	};
};
