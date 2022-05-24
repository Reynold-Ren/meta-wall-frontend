import './sidebar.scss';
import Button from '../Button';
import SidebarItem from '../SidebarItem';
import defaultAvatar from '../../assets/user_default.png';
import { BiLike, BiBell } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';

const Sidebar = () => {
	const navigate = useNavigate();
	const handleCreatePostBtnClick = () => {
		navigate('/create');
	};
	const { user } = useAuthContext();
	const avatar = user.photo ? user.photo : defaultAvatar;
	return (
		<div className="sidebarContainer">
			<Button wording="張貼動態" style="primary" handleClick={handleCreatePostBtnClick}></Button>
			<SidebarItem avatar={avatar} wording={user.name} handleClick={() => navigate('/profile')} />
			<SidebarItem icon={<BiBell />} wording="追蹤名單" handleClick={() => navigate('/follow')} />
			<SidebarItem icon={<BiLike />} wording="我按讚的文章" handleClick={() => navigate('/likes')} />
		</div>
	);
};

export default Sidebar;
