import { List } from 'antd';
import './HolidayList.css';

const HolidayList = (props) => {
    return (
        <List
            className = "HolidayList"
            size="large"
            bordered
            loading={props.loading}
            dataSource={props.holidays}
            renderItem={holiday =>
            <List.Item key={holiday.id}>
                <List.Item.Meta
                    title = {holiday.name}
                    description = {holiday.weekday}/>
                    {holiday.date}
            </List.Item>}
        />
    );
}

export default HolidayList;