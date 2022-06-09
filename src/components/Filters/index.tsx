import './filters.scss';
import { FiSearch } from 'react-icons/fi';
import { FILTER_OPTIONS } from '../../constants/filterOptions';
import React from 'react';

type FiltersPropsType = {
	handleSelect: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
	handleInput: React.Dispatch<string>;
	handleQueryBtnClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
};

const Filters = ({ handleSelect, handleInput, handleQueryBtnClick }: FiltersPropsType) => {
	const handleOptionChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
		handleSelect(evt);
	};
	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		handleInput(evt.target.value);
	};
	return (
		<div className="filtersContainer">
			<div className="filtersContainer__select">
				<select onChange={handleOptionChange}>
					{FILTER_OPTIONS.map((option) => (
						<option key={option.id} value={`${option.type}-${option.value}`}>
							{option.title}
						</option>
					))}
				</select>
			</div>
			<div className="filtersContainer__search">
				<input type="text" placeholder="搜尋貼文" onChange={handleInputChange} />
				<div className="filtersContainer__searchBtn" onClick={handleQueryBtnClick}>
					<FiSearch />
				</div>
			</div>
		</div>
	);
};

export default Filters;
