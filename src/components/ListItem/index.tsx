import './listItem.scss';
import FollowsAddOn from './FollowsAddOn';
import LikesAddOn from './LikesAddOn';
import defaultAvatar from '../../assets/user_default.png';
import { UserFieldType } from '../../models/user.interface';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

type FollowItem = {
	user: UserFieldType;
	createdAt: string;
	[key: string]: any;
};

type LikeItem = {
	_id?: string;
	userId: UserFieldType;
	createdAt: string;
	[key: string]: any;
};

type ListItemProps = {
	type: 'follows' | 'likes';
	data: FollowItem | LikeItem;
	remove?: (id: string) => void;
};

const ListItem = ({ type, data, remove }: ListItemProps) => {
	const userKey = type === 'follows' ? 'user' : 'userId';
	const { avatar, name, _id } = data[userKey];
	const { createdAt } = data;
	const navigate = useNavigate();

	const timeFormat = (createdTime: string) => {
		const theDay = moment(createdTime);
		return theDay.format('YYYY-MM-DD HH:mm');
	};

	const handleAuthorOnClick = () => {
		navigate(`/user/${_id}`);
	};

	return (
		<div className="listItemContainer">
			<div className="listItemContainer__info" onClick={handleAuthorOnClick}>
				<div className="listItemContainer__info-avatar">
					<img src={avatar === '' ? defaultAvatar : avatar} alt="" />
				</div>
				<div className="listItemContainer__info-detail">
					<h3>{name}</h3>
					<p>
						{type == 'follows' ? '追蹤' : '發文'}時間：{timeFormat(createdAt)}
					</p>
				</div>
			</div>
			<div className="listItemContainer__tools">
				{type == 'follows' ? <FollowsAddOn time={createdAt} /> : <LikesAddOn postId={data._id} remove={remove!} />}
			</div>
		</div>
	);
};

export default ListItem;
