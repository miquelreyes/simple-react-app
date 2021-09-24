import { HolidayAPI } from "holidayapi";
import key from "./apikey";

export function getApiUrl() {
	const holidayApi = new HolidayAPI({ key });
	const country = "ES";
	const year = "2020";
	const url =
		holidayApi.baseUrl +
		"holidays?key=" +
		key +
		"&country=" +
		country +
		"&year=" +
		year;
	return url;
}

export const arrangeHolidays = array => {
	let holidays = array.map((holiday, index) => {
		return {
			id: index + 1,
			name: holiday.name,
			date: holiday.date,
			weekday: holiday.weekday.date.name,
		};
	});

	return holidays;
};

export const getWeekday = dateAsString => {
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
};
