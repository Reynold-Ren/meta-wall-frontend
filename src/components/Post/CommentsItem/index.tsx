import './commentsItem.scss';
import defaultAvatar from '../../../assets/user_default.png';
import moment from 'moment';

type CommentsItemPropsType = {
	avatar: string;
	name: string;
	createAt: string;
	comment: string;
};

const CommentsItem = ({ avatar, name, createAt, comment }: CommentsItemPropsType) => {
	const authorAvatar = avatar !== '' ? avatar : defaultAvatar;
	const timeFormat = (createdTime: string) => {
		const theDay = moment(createdTime);
		return theDay.format('YYYY-MM-DD HH:mm');
	};

	return (
		<div className="commentsItemContainer">
			<div className="commentsItemContainer__avatar">
				<img src={authorAvatar} alt="" />
			</div>
			<div className="commentsItemContainer__info">
				<h3>{name}</h3>
				<span>{timeFormat(createAt)}</span>
				<p>{comment}</p>
			</div>
		</div>
	);
};

export default CommentsItem;
