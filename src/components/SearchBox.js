import { AutoComplete } from "antd";

const SearchBox = props => {
	return (
		<AutoComplete
			className="SearchBox"
			style={{ width: 200 }}
			options={props.options}
			placeholder={props.placeholder}
			onChange={props.onChange}
			filterOption={props.filterOption}
		/>
	);
};

export default SearchBox;
