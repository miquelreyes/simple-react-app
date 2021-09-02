import './App.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash";
import SearchBox from './SearchBox';
import FetchButton from './FetchButton';
import HolidayList from './HolidayList';
import { fetchHolidaysRequest, updateSearchText } from '../redux/actions/holidaysActions';
import { selectHolidays, selectFilteredHolidays, selectLoading } from '../redux/selectors/holidaysSelectors';

const App = () => {    
    const holidays = useSelector(selectHolidays);
    const loading = useSelector(selectLoading);
    const filtered = useSelector(selectFilteredHolidays);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchHolidaysRequest());
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
                onClick={() => dispatch(fetchHolidaysRequest())}
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