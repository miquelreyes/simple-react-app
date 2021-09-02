import { createSelector } from "@reduxjs/toolkit";

export const selectHolidays = state => state.holidays.byId;

export const selectHolidayById = (state, id) => state.holidays.byId[id];

export const selectText = state => state.text;

export const selectFilteredHolidays = createSelector(
    [
        selectHolidays,
        selectText
    ],
    (holidays, text) => {
        if (holidays.length > 0) {
            return holidays.filter(holiday => holiday.name.toLowerCase().includes(text.toLowerCase()));
        }
        return holidays;
    }
);

export const selectLoading = state => state.loading;