import { useForm } from "react-hook-form";
import { Button } from "antd";
import './AddHolidayForm.css';

const AddHolidayForm = (props) => {
    const { register, handleSubmit } = useForm();

    return (
        <form className={props.className} onSubmit={handleSubmit(props.onSubmit)}>
            <label>Name:</label>
            <input {...register("name", { required: true, maxLength: 30 })} />
            <label>Date:</label>
            <input type="date" {...register("date", { required: true })} />
            <Button
                htmlType="submit"
            >
                Submit
            </Button>
        </form>
    );
}

export default AddHolidayForm;