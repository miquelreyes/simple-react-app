import './App.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import _ from "lodash";
import { List, AutoComplete, Button } from 'antd';
import key from './apikey'
import { FETCH_REQUEST, FETCH_SUCCESS, FILTER } from './constants';
import { HolidayAPI } from 'holidayapi';

function getApiUrl(key) {
    const holidayApi = new HolidayAPI({ key });
    const country = "ES";
    const year = "2020";
    const url = holidayApi.baseUrl + "holidays?key=" + key + "&country=" + country + "&year=" + year;
    return url;
}

const fetchData = () => async (dispatch) => {
    dispatch({type: FETCH_REQUEST});

    try {
        let holidays = await fetch(getApiUrl(key));
        holidays = await holidays.json();

        const array = holidays.holidays.map((holiday) => {return holiday;});
        dispatch({type: FETCH_SUCCESS, value: array});
    } catch(error) {
    }
}

function App() {
    const holidays = useSelector(store => store.holidays);
    const filtered = useSelector(store => store.filtered);
    const loading = useSelector(store => store.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    },
    []);

    function filter(text) {
        dispatch({type: FILTER, value: text})
    }

    return (
        <div className="App">
            <AutoComplete
                className = "SearchBox"
                style={{width: 200,}}
                options={holidays.map(holiday => {return {value: holiday.name}})}
                placeholder="Type to filter"
                onChange = {_.debounce(filter, 500)}
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
                <List.Item key={holiday.uuid}>
                    <List.Item.Meta
                        title = {holiday.name}
                        description = {holiday.weekday.date.name}/>
                        {holiday.date}
                </List.Item>}
            />
        </div>
    );
}

export default App;