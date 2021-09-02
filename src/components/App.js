import './App.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash";
import SearchBox from './SearchBox';
import FetchButton from './FetchButton';
import HolidayList from './HolidayList';
import key from '../apikey'
import { HolidayAPI } from 'holidayapi';
import { fetchHolidaysStart, fetchHolidaysSuccess, updateSearchText } from '../redux/actions/holidaysActions';
import { selectHolidays, selectFilteredHolidays, selectLoading } from '../redux/selectors/holidaysSelectors';

function getApiUrl(key) {
    const holidayApi = new HolidayAPI({ key });
    const country = "ES";
    const year = "2020";
    const url = holidayApi.baseUrl + "holidays?key=" + key + "&country=" + country + "&year=" + year;
    return url;
}

const arrangeHolidays = (array) => {
    let id = 0;
    let arranged = [];

    array.forEach(holiday => {
        let element = {
            id: id,
            name: holiday.name,
            date: holiday.date,
            weekday: holiday.weekday.date.name
        }
        arranged.push(element);
        id++;
    });

    return arranged;
}

const fetchData = () => async (dispatch) => {
    dispatch(fetchHolidaysStart());

    try {
        let response = await fetch(getApiUrl(key));
        response = await response.json();

        const holidays = response.holidays.map((holiday) => {return holiday;});
        const arrangedHolidays = arrangeHolidays(holidays);
        dispatch(fetchHolidaysSuccess(arrangedHolidays));
    } catch(error) {
    }
}

const App = () => {    
    const holidays = useSelector(selectHolidays);
    const loading = useSelector(selectLoading);
    const filtered = useSelector(selectFilteredHolidays);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchData());
    },
    [dispatch]);

    const updateText = (text) => {
        dispatch(updateSearchText(text));
    }

    const debouncedUpdateText = _.debounce(updateText, 500);

    return (
        <div className="App">
            <SearchBox
                options={holidays.map(holiday => {return {value: holiday.name}})}
                placeholder="Type to filter"
                onChange = {debouncedUpdateText}
                filterOption={(inputValue, option) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
                }
            />
            <FetchButton
                onClick={() => dispatch(fetchData())}
                text={"Fetch data again"}
            />
            <HolidayList
                loading={loading}
                holidays={filtered}
            />
        </div>
    );
}

export default App;