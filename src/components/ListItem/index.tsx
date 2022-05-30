import './listItem.scss';
import FollowsAddOn from './FollowsAddOn';
import LikesAddOn from './LikesAddOn';
import defaultAvatar from '../../assets/user_default.png';
import { LikesType } from '../../models/user.interface';

type ListItemProps = {
	type?: 'follows' | 'likes';
	data?: LikesType;
};

const ListItem = ({
	type = 'follows',
	data = {
		_id: '123',
		name: '波吉',
		photo: 'https://i.imgur.com/StYpshR.png',
	},
}: ListItemProps) => {
	const { name, photo } = data;
	// const avatar = () => {
	// };
	return (
		<div className="listItemContainer">
			<div className="listItemContainer__info">
				<div className="listItemContainer__info-avatar">
					<img src={photo === '' ? defaultAvatar : photo} alt="" />
				</div>
				<div className="listItemContainer__info-detail">
					<h3>{name}</h3>
					<p>{type == 'follows' ? '追蹤' : '發文'}時間：2022/1/10 12:00</p>
				</div>
			</div>
			<div className="listItemContainer__tools">{type == 'follows' ? <FollowsAddOn /> : <LikesAddOn />}</div>
		</div>
	);
};

export default ListItem;
