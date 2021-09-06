import './App.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash";
import SearchBox from './SearchBox';
import FetchButton from './FetchButton';
import HolidayList from './HolidayList';
import AddHolidayForm from './AddHolidayForm';
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
            <Button
                onClick={() => dispatch(toggleAddForm())}
            >
                {showingForm ? "Hide form" : "Add holiday"}
            </Button>
            {showingForm && <AddHolidayForm
                onSubmit={(holiday) => dispatch(addHolidayRequest(holiday))}
            />}
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