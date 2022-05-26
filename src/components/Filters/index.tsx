import './filters.scss';
import { FiSearch } from 'react-icons/fi';

const Filters = () => {
	return (
		<div className="filtersContainer">
			<div className="filtersContainer__select">
				<select name="" id="">
					<option value="">最新貼文</option>
					<option value="">最舊貼文</option>
				</select>
			</div>
			<div className="filtersContainer__search">
				<input type="text" placeholder="搜尋貼文" />
				<div className="filtersContainer__searchBtn">
					<FiSearch />
				</div>
			</div>
		</div>
	);
};

export default Filters;
