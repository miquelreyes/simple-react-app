import { List, AutoComplete } from 'antd';
import './App.css';
import { HolidayAPI } from 'holidayapi';
import { useEffect, useState, useReducer } from "react";
import _ from "lodash";
const key = '3fcaf5be-c201-4a4d-8644-8669aac1d051'
const holidayApi = new HolidayAPI({ key });
const country = "ES";
const year = "2020";
const url = holidayApi.baseUrl + "holidays?key=" + key + "&country=" + country + "&year=" + year;

function App() {
    const [holidays, setHolidays] = useState([]);
    const [filtered, dispatch] = useReducer(filter, []);

    function filter(state, text) {
        var filteredHolidays = holidays.filter(holiday => holiday.name.toLowerCase().includes(text.toLowerCase()));
        console.log(filteredHolidays);
        return filteredHolidays;
    }

    async function fetchData() {
        let holidays = await fetch(url);
        holidays = await holidays.json();

        const array = holidays.holidays.map((holiday) => {return holiday;});
        setHolidays(array);
        dispatch("");
    }

    useEffect(() => {
        fetchData();
    },
    []);

    return (
        <div className="App">
            <AutoComplete
                className = "SearchBox"
                style={{width: 200,}}
                options={holidays.map(holiday => {return {value: holiday.name}})}
                placeholder="Type to filter"
                onChange = {_.debounce(dispatch, 500)}
                filterOption={(inputValue, option) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
                }
            />
            <List
                className = "HolidayList"
                size="large"
                bordered
                dataSource={filtered}
                renderItem={holiday =>
                <List.Item key={holiday.uuid}>
                    <List.Item.Meta
                        title = {holiday.name}
                        description = {holiday.date}/>
                        {holiday.weekday.date.name}
                </List.Item>}
            />
        </div>
    );
}

export default App;