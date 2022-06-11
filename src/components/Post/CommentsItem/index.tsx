import './commentsItem.scss';
import defaultAvatar from '../../../assets/user_default.png';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

type CommentsItemPropsType = {
	id: string;
	avatar: string;
	name: string;
	createAt: string;
	comment: string;
};

const CommentsItem = ({ id, avatar, name, createAt, comment }: CommentsItemPropsType) => {
	const navigate = useNavigate();
	const authorAvatar = avatar !== '' ? avatar : defaultAvatar;

	const timeFormat = (createdTime: string) => {
		const theDay = moment(createdTime);
		return theDay.format('YYYY-MM-DD HH:mm');
	};

	const handleAuthorOnClick = (id: string) => {
		navigate(`/user/${id}`);
	};

	return (
		<div className="commentsItemContainer">
			<div className="commentsItemContainer__avatar" onClick={() => handleAuthorOnClick(id)}>
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
