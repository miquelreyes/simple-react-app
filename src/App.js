import { List, AutoComplete } from 'antd';
import './App.css';
import { HolidayAPI } from 'holidayapi';
import { useEffect, useState } from "react";
import _ from "lodash";
const key = '3fcaf5be-c201-4a4d-8644-8669aac1d051'
const holidayApi = new HolidayAPI({ key });
const country = "ES";
const year = "2020";
const url = holidayApi.baseUrl + "holidays?key=" + key + "&country=" + country + "&year=" + year;

function App() {
    const [holidays, setHolidays] = useState([]);
    const [filteredHolidays, setFilteredHolidays] = useState([]);
    const [text, setText] = useState("");

    function filter(input) {
        console.log(input);
        setText(input);
        setFilteredHolidays(holidays.filter(holiday => holiday.name.toLowerCase().includes(input.toLowerCase())));
        console.log(filteredHolidays);
    }

    useEffect(() => {
        async function fetchData() {
            let holidays = await fetch(url);
            holidays = await holidays.json();

            const result = holidays.holidays.map((holiday) => {return holiday;});
            console.log(holidays);
            console.log(result);
            setHolidays(result);
            setFilteredHolidays(result);
        }
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
                onChange = {_.debounce(filter, 500)}
                filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
            />
            <List
                className = "HolidayList"
                size="large"
                bordered
                dataSource={filteredHolidays}
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