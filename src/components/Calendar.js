import useCalendar from 'react-use-calendar';
import { Button } from 'antd';

const renderDay = (day) => {
    if (day.isSameMonth) {
        return (
            <td key={day.dayOfMonth} title={day.events.map(event => event.note).join("\r\n")} style={{ textAlign: 'center', backgroundColor: (day.events.length > 0) ? '#ff0' : '#fff' }}>
            {day.dayOfMonth}
            </td>
        );
    } else {
        return(
            <td key={day.dayOfMonth} style={{ textAlign: 'center', backgroundColor: '#fff' }}>
            {" "}
            </td>
        )
    }
}

export const Calendar = (props) => {
    console.log(props.holidays);
    if (props.holidays.length != 0) {
        let events = [];
        events = props.holidays.map((holiday) => {
            const date = new Date(holiday.date);
            date.setHours(0);
            return {
                startDate: date,
                endDate: date,
                note: holiday.name
            }
        });

        const startingDate = new Date(2020, 0, 1);

        const [state, actions] = useCalendar(startingDate, {events});

        return (
            <table className={props.className}>
                <thead>
                <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                    <strong>{state.month} - {state.year}</strong>
                    </td>
                    <td colSpan={2} style={{ textAlign: 'right' }}>
                    <Button onClick={actions.getPrevMonth}>
                        <strong>&lt;</strong>
                    </Button>              
                    <Button onClick={actions.getNextMonth}>
                        <strong>&gt;</strong>
                    </Button>              
                    </td>
                </tr>
                <tr>
                    {state.days.map(day => <th key={day}>{day}</th>)}
                </tr>
                </thead>
                <tbody>
                {state.weeks.map((week, index) => 
                    <tr key={index}>
                    {week.map(
                        day => renderDay(day)
                    )}
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
    else {
        return(null);
    }
}