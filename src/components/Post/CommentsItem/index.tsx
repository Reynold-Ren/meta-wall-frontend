import './commentsItem.scss';

const CommentsItem = () => {
	return (
		<div className="commentsItemContainer">
			<div className="commentsItemContainer__avatar">
				<img src="" alt="" />
			</div>
			<div className="commentsItemContainer__info">
				<h3>希琳</h3>
				<span>2022/1/11 10:00</span>
				<p>真的～我已經準備冬眠了</p>
			</div>
		</div>
	);
};

export default CommentsItem;
