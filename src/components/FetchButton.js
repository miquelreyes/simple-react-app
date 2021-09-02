import { Button } from 'antd';

const FetchButton = (props) => {
    return (
        <Button
            className="FetchButton"
            onClick={props.onClick}>
            {props.text}
        </Button>
    )
}

export default FetchButton;