import { List } from 'antd';
import './HolidayList.css';

const getSearchQuery = (text) => {
    return text.replace(/\s/g, '+');
}

const HolidayList = (props) => {
    return (
        <List
            className = {props.className}
            size="large"
            bordered
            loading={props.loading}
            dataSource={props.holidays}
            renderItem={holiday =>
            <a href={"https://www.google.com/search?q="+getSearchQuery(holiday.name)}>
            <List.Item key={holiday.id}>
                
                <List.Item.Meta
                    title = {holiday.name}
                    description = {holiday.weekday}/>
                    {holiday.date}
            </List.Item>
            </a>}
        />
    );
}

export default HolidayList;