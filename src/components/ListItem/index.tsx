import './listItem.scss';
import FollowsAddOn from './FollowsAddOn';
import LikesAddOn from './LikesAddOn';
import DonateAddOn from './DonateAddOn';
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

type DonateItem = {
	_id: string;
	donatee: UserFieldType;
	donateNum: number;
	createdAt: string;
	[key: string]: any;
};

type ListItemProps = {
	type: 'follows' | 'likes' | 'donate';
	data: FollowItem | LikeItem | DonateItem;
	remove?: (id: string) => void;
};

const ListItem = ({ type, data, remove }: ListItemProps) => {
	const generateUserKey = () => {
		switch (type) {
			case 'follows':
				return 'user';
			case 'likes':
				return 'userId';
			case 'donate':
				return 'donatee';
			default:
				return 'user';
		}
	};
	const generateTimeWording = () => {
		switch (type) {
			case 'follows':
				return '追隨';
			case 'likes':
				return '發文';
			case 'donate':
				return '贊助';
			default:
				return '追隨';
		}
	};
	const generateAddOns = () => {
		switch (type) {
			case 'follows':
				return <FollowsAddOn time={createdAt} />;
			case 'likes':
				return <LikesAddOn postId={data._id} remove={remove!} />;
			case 'donate':
				return <DonateAddOn coinNum={data.donateNum} />;
		}
	};
	const userKey = generateUserKey();
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
						{generateTimeWording()}時間：{timeFormat(createdAt)}
					</p>
				</div>
			</div>
			<div className="listItemContainer__tools">{generateAddOns()}</div>
		</div>
	);
};

export default ListItem;
