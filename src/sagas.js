import { put, select, takeLatest, all } from 'redux-saga/effects';
import { fetchHolidaysStart, fetchHolidaysSuccess, loadingStart, addHolidaySuccess, fetchHolidaysError } from './redux/actions/holidaysActions';
import { FETCH_HOLIDAYS_REQUEST, ADD_HOLIDAY_REQUEST } from './redux/types';

import key from './apikey'
import { HolidayAPI } from 'holidayapi';
import { selectHolidaysLength } from './redux/selectors/holidaysSelectors';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function getApiUrl(key) {
    const holidayApi = new HolidayAPI({ key });
    const country = "ES";
    const year = "2020";
    const url = holidayApi.baseUrl + "holidays?key=" + key + "&country=" + country + "&year=" + year;
    return url;
}

const arrangeHolidays = (array) => {
    let holidays = array.map((holiday, index) => {
        return {
            id: index+1,
            name: holiday.name,
            date: holiday.date,
            weekday: holiday.weekday.date.name
        }
    });

    return holidays;
}

const getWeekday = (dateAsString) => {
    let date = new Date(dateAsString);
    switch (date.getDay()) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Monday";
    }
}

function* fetchHolidays() {
    yield put(fetchHolidaysStart());
    try {
        let response = yield fetch(getApiUrl(key));
        response = yield response.json();

        const holidays = response.holidays.map((holiday) => {return holiday;});
        const arrangedHolidays = arrangeHolidays(holidays);
        yield put(fetchHolidaysSuccess(arrangedHolidays));
    } catch (e) {
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