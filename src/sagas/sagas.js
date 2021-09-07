import { put, select, takeLatest, all } from 'redux-saga/effects';
import { fetchHolidaysStart, fetchHolidaysSuccess, loadingStart, addHolidaySuccess, fetchHolidaysError } from '../redux/actions/holidaysActions';
import { FETCH_HOLIDAYS_REQUEST, ADD_HOLIDAY_REQUEST } from '../redux/types';

import { selectHolidaysLength } from '../redux/selectors/holidaysSelectors';
import { arrangeHolidays, getWeekday, getApiUrl } from '../utils';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* fetchHolidays() {
    yield put(fetchHolidaysStart());
    try {
        let response = yield fetch(getApiUrl());
        response = yield response.json();

        const holidays = response.holidays.map((holiday) => {return holiday;});
        const arrangedHolidays = arrangeHolidays(holidays);
        yield put(fetchHolidaysSuccess(arrangedHolidays));
    } catch (e) {
        console.log(e);
        yield put(fetchHolidaysError());
    }
}

function* addHoliday(action) {
    yield put(loadingStart());
    const newId = yield select(selectHolidaysLength) + 1;
    const newHoliday = {
        id: newId,
        name: action.holiday.name,
        date: action.holiday.date,
        weekday: getWeekday(action.holiday.date),
    }
    yield delay(500);
    yield put(addHolidaySuccess(newHoliday));
}

function* fetchHolidaysSaga() {
    yield takeLatest(FETCH_HOLIDAYS_REQUEST, fetchHolidays);
}

function* addHolidaySaga() {
    yield takeLatest(ADD_HOLIDAY_REQUEST, addHoliday);
}

export default function* rootSaga() {
    yield all([
        fetchHolidaysSaga(),
        addHolidaySaga()
    ])
  }