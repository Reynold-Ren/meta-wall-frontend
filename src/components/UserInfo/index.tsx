import './userInfo.scss';
import { useState, useEffect } from 'react';
import Button from '../Button';
import defaultAvatar from '../../assets/user_default.png';
import diamondIcon from '../../assets/icon/diamondIcon.svg';
import { User, Donate } from '../../apis/apis';
import Modal from 'react-modal';
import { CUSTOM_STYLES } from '../../constants/modalStyle';
import { useAuthContext } from '../../context/auth';

type FollowersType = {
	user: string;
	createdAt: string;
};

type UserInfoPropsType = {
	userInfo: {
		_id: string;
		name: string;
		followers: FollowersType[];
		avatar: string;
	};
};

Modal.setAppElement('#root');

const UserInfo = ({ userInfo }: UserInfoPropsType) => {
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [isFollow, setIsFollow] = useState<boolean>(false);
	const [follower, setFollower] = useState<FollowersType[]>([]);
	const [donateCoinNum, setDonateCoinNum] = useState<number>(0);
	const { _id, name, avatar, followers } = userInfo;
	const { user } = useAuthContext();

	useEffect(() => {
		setFollower(userInfo.followers);
		if (userInfo.followers.some((follower) => follower.user === user.id)) {
			setIsFollow(true);
		}
	}, [userInfo]);

	const followUser = async () => {
		const result = await User.follow({ id: _id });
		if (result.status) {
			setIsFollow(true);
			const copyArr = Array.from(follower);
			copyArr.push({ user: user.id, createdAt: '' });
			setFollower(copyArr);
		}
	};

	const unFollowUser = async () => {
		const result = await User.unFollow({ id: _id });
		if (result.status) {
			setIsFollow(false);
			const copyArr = Array.from(follower);
			const result = copyArr.filter((item) => item.user !== user.id);
			setFollower(result);
		}
	};

	const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const num = parseInt(evt.target.value);
		setDonateCoinNum(num);
	};

	const handleDonateBtnOnClick = async () => {
		const result = await Donate.user({ authorUserID: _id, coinNum: donateCoinNum });
		if (result.status) {
		}
	};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className="userInfoContainer">
			<div className="userInfoContainer__avatar">
				<img src={avatar !== '' ? avatar : defaultAvatar} alt="" />
			</div>
			<div className="userInfoContainer__detail">
				<h3>{name}</h3>
				<p>{follower.length} 人追蹤</p>
			</div>
			<div className="userInfoContainer__addOns">
				<div className="donateBtn" onClick={openModal}>
					<img src={diamondIcon} alt="" />
				</div>
				{isFollow ? (
					<Button wording="取消追蹤" layout="UnFollow" style="primary" handleClick={unFollowUser} />
				) : (
					<Button wording="追蹤" layout="Follow" style="primary" handleClick={followUser} />
				)}
			</div>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={CUSTOM_STYLES} contentLabel="Modal">
				<div className="authorContainer">
					<div className="authorContainer__avatar">
						<img src={avatar !== '' ? avatar : defaultAvatar} alt="" />
					</div>
					<h3>太讚了</h3>
					<h4>我要贊助他</h4>
					<div className="authorContainer__inputGroup">
						<label>贊助金額</label>
						<input type="number" min="1" onChange={handleInputChange} />
					</div>
				</div>
				<Button wording="取消贊助" style="primary" layout="UnDonate" handleClick={closeModal} />
				<Button wording="確認贊助" style="primary" layout="Donate" handleClick={handleDonateBtnOnClick} />
			</Modal>
		</div>
	);
};

export default UserInfo;
