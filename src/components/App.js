import './App.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash";
import { List, AutoComplete, Button } from 'antd';
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
        let holidays = await fetch(getApiUrl(key));
        holidays = await holidays.json();

        const array = holidays.holidays.map((holiday) => {return holiday;});
        const arrangedHolidays = arrangeHolidays(array);
        dispatch(fetchHolidaysSuccess(arrangedHolidays));
    } catch(error) {
    }
}

function App() {    
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

    return (
        <div className="App">
            <AutoComplete
                className = "SearchBox"
                style={{width: 200,}}
                options={holidays.map(holiday => {return {value: holiday.name}})}
                placeholder="Type to filter"
                onChange = {_.debounce(updateText, 500)}
                filterOption={(inputValue, option) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
                }
            />
            <Button
                className="FetchButton"
                onClick={() => dispatch(fetchData())}>
                Fetch data again
            </Button>
            <List
                className = "HolidayList"
                size="large"
                bordered
                loading={loading}
                dataSource={filtered}
                renderItem={holiday =>
                <List.Item key={holiday.id}>
                    <List.Item.Meta
                        title = {holiday.name}
                        description = {holiday.weekday}/>
                        {holiday.date}
                </List.Item>}
            />
        </div>
    );
}

export default App;