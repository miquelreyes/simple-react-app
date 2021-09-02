import { put, takeLatest } from 'redux-saga/effects';
import { fetchHolidaysStart, fetchHolidaysSuccess } from './redux/actions/holidaysActions';
import { FETCH_HOLIDAYS_REQUEST } from './redux/types';

import key from './apikey'
import { HolidayAPI } from 'holidayapi';

function getApiUrl(key) {
    const holidayApi = new HolidayAPI({ key });
    const country = "ES";
    const year = "2020";
    const url = holidayApi.baseUrl + "holidays?key=" + key + "&country=" + country + "&year=" + year;
    return url;
}

const arrangeHolidays = (array) => {
    let id = 0;
    let holidays = [];

    array.forEach(holiday => {
        let element = {
            id: id,
            name: holiday.name,
            date: holiday.date,
            weekday: holiday.weekday.date.name
        }
        holidays.push(element);
        id++;
    });

    return holidays;
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

    }
}

function* mySaga() {
    yield takeLatest(FETCH_HOLIDAYS_REQUEST, fetchHolidays);
}

export default mySaga;