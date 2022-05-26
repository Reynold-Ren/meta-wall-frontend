import './listItem.scss';
import FollowsAddOn from './FollowsAddOn';
import LikesAddOn from './LikesAddOn';
import defaultAvatar from '../../assets/user_default.png';

type ListItemProps = {
	type?: 'follows' | 'likes';
};

const ListItem = ({ type = 'follows' }: ListItemProps) => {
	return (
		<div className="listItemContainer">
			<div className="listItemContainer__info">
				<div className="listItemContainer__info-avatar">
					<img src={defaultAvatar} alt="" />
				</div>
				<div className="listItemContainer__info-detail">
					<h3>愛爾敏</h3>
					<p>{type == 'follows' ? '追蹤' : '發文'}時間：2022/1/10 12:00</p>
				</div>
			</div>
			<div className="listItemContainer__tools">{type == 'follows' ? <FollowsAddOn /> : <LikesAddOn />}</div>
		</div>
	);
};

export default ListItem;
