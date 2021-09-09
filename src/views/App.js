import './App.css';
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import _ from "lodash";
import SearchBox from '../components/SearchBox';
import FetchButton from '../components/FetchButton';
import HolidayList from '../components/HolidayList';
import AddHolidayForm from '../components/AddHolidayForm'
import { addHolidayRequest, fetchHolidaysRequest, updateSearchText, toggleAddForm } from '../redux/actions/holidaysActions';
import { selectHolidays, selectFilteredHolidays, selectLoading, selectShowForm } from '../redux/selectors/holidaysSelectors';
import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    border-style: solid;
    border-width: 2px;
    font-weight: 500;
    border-color: palevioletred;
    color: palevioletred;
    :hover {
        color: lightsalmon;
        border-color: lightsalmon;
    }
    :focus {
        color: palevioletred;
        border-color: palevioletred;
    }
`;

const StyledHolidayList = styled(HolidayList)`
    width: 30rem;
`;

const StyledAddHolidayForm = styled(AddHolidayForm)`
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 20rem;
    padding: 1rem;
    border-style: solid;
    border-width: 1px;
    border-color: lightgray;
    border-radius: 1%;

    > * {
        margin: 0.2rem;
    }

    input {
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        width: 100%;
    }

    button {
        margin-top: 1rem;
        align-self: center;
        width: fit-content;
    }
`;

const App = ({className}) => {    
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

    const toggleFormOnClick = useCallback(() => dispatch(toggleAddForm()), [dispatch]);

    const addOnSubmit = useCallback((holiday) => dispatch(addHolidayRequest(holiday)), [dispatch]);

    const fetchOnClick = useCallback(() => dispatch(fetchHolidaysRequest()), [dispatch]);

    return (
        <div className={className}>
            <SearchBox
                options={options}
                placeholder="Type to filter"
                onChange = {debouncedUpdateText}
                filterOption={(inputValue, option) => 
                option.value.toLowerCase().includes(inputValue.toLowerCase())}
            />
            <StyledButton
                onClick={toggleFormOnClick}
            >
                {showingForm ? "Hide form" : "Add holiday"}
            </StyledButton>
            {showingForm && <StyledAddHolidayForm
                onSubmit={addOnSubmit}
            />}
            <FetchButton
                onClick={fetchOnClick}
                text={"Fetch data again"}
            />
            <StyledHolidayList
                loading={loading}
                holidays={filtered}
            />
        </div>
    );
}

export default App;