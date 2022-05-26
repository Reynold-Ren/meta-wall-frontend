import './empty.scss';

const Empty = () => {
	return (
		<div className="emptyContainer">
			<div className="emptyContainer__header">
				<span className="red"></span>
				<span className="yellow"></span>
				<span className="green"></span>
			</div>
			<div className="emptyContainer__body">目前尚無動態，新增一則貼文吧！</div>
		</div>
	);
};

export default Empty;
