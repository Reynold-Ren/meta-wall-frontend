import './userInfo.scss';
import { useState } from 'react';
import Button from '../Button';
import defaultAvatar from '../../assets/user_default.png';
import diamondIcon from '../../assets/icon/diamondIcon.svg';
import { User } from '../../apis/apis';

type UserInfoPropsType = {
	userInfo: {
		_id: string;
		name: string;
		followers: {
			user: string;
			createdAt: string;
		}[];
		avatar: string;
	};
};

const UserInfo = ({ userInfo }: UserInfoPropsType) => {
	const [isFollow, setIsFollow] = useState<boolean>(false);
	const { _id, name, avatar, followers } = userInfo;

	const followUser = async () => {
		const result = await User.follow({ id: _id });
		if (result.status) {
			setIsFollow(true);
		}
	};

	const unFollowUser = async () => {
		const result = await User.unFollow({ id: _id });
		if (result.status) {
			setIsFollow(false);
		}
	};

	return (
		<div className="userInfoContainer">
			<div className="userInfoContainer__avatar">
				<img src={avatar !== '' ? avatar : defaultAvatar} alt="" />
			</div>
			<div className="userInfoContainer__detail">
				<h3>{name}</h3>
				<p>{followers.length} 人追蹤</p>
			</div>
			<div className="userInfoContainer__addOns">
				<div className="donateBtn">
					<img src={diamondIcon} alt="" />
				</div>
				{isFollow ? (
					<Button wording="取消追蹤" layout="UnFollow" style="primary" handleClick={unFollowUser} />
				) : (
					<Button wording="追蹤" layout="Follow" style="primary" handleClick={followUser} />
				)}
			</div>
		</div>
	);
};

export default UserInfo;
