import { UserFieldType } from '../../../models/user.interface';
import defaultAvatar from '../../../assets/user_default.png';
import moment from 'moment';

type DonateeListItemPropsType = {
	createdAt: string;
	user: UserFieldType;
	coinNum: number;
};

const DonateeListItem = ({ createdAt, user, coinNum }: DonateeListItemPropsType) => {
	const { name, avatar } = user;

	const timeFormat = (createdTime: string) => {
		const theDay = moment(createdTime);
		return theDay.format('MM-DD');
	};

	return (
		<div className="donateeListItemContainer">
			<div className="donateeListItem-avatar">
				<img src={avatar === '' ? defaultAvatar : avatar} alt="" />
			</div>
			<div className="donateeListItem-name">{name}</div>
			<div className="donateeListItem-coinNum">
				<span>{coinNum}</span> 枚
			</div>
			<div className="donateeListItem-time">{timeFormat(createdAt)}</div>
		</div>
	);
};

export default DonateeListItem;
