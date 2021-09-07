import './App.css';
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash";
import SearchBox from '../components/SearchBox';
import FetchButton from '../components/FetchButton';
import HolidayList from '../components/HolidayList';
import AddHolidayForm from '../components/AddHolidayForm';
import { addHolidayRequest, fetchHolidaysRequest, updateSearchText, toggleAddForm } from '../redux/actions/holidaysActions';
import { selectHolidays, selectFilteredHolidays, selectLoading, selectShowForm } from '../redux/selectors/holidaysSelectors';
import { Button } from 'antd';

const App = () => {    
    const holidays = useSelector(selectHolidays);
    const loading = useSelector(selectLoading);
    const filtered = useSelector(selectFilteredHolidays);
    const showingForm = useSelector(selectShowForm);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchHolidaysRequest());
    },
    [dispatch]);

    const updateText = (text) => {
        dispatch(updateSearchText(text));
    }

    const debouncedUpdateText = _.debounce(updateText, 500);    

    const options = useCallback(holidays.map(holiday => {return {value: holiday.name}}), [holidays]);

    const toggleOnClick = useCallback(() => dispatch(toggleAddForm()), [dispatch]);

    const addOnSubmit = useCallback((holiday) => dispatch(addHolidayRequest(holiday)), [dispatch]);

    const fetchOnClick = useCallback(() => dispatch(fetchHolidaysRequest()), [dispatch]);

    return (
        <div className="App">
            <SearchBox
                options={options}
                placeholder="Type to filter"
                onChange = {debouncedUpdateText}
                filterOption={(inputValue, option) => 
                option.value.toLowerCase().includes(inputValue.toLowerCase())}
            />
            <Button
                onClick={toggleOnClick}
            >
                {showingForm ? "Hide form" : "Add holiday"}
            </Button>
            {showingForm && <AddHolidayForm
                onSubmit={addOnSubmit}
            />}
            <FetchButton
                onClick={fetchOnClick}
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