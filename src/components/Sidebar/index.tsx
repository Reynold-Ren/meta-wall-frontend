import './sidebar.scss';
import Button from '../Button';
import SidebarItem from '../SidebarItem';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { SIDEBAR_ITEM } from '../../constants/sidebarItem';

const Sidebar = () => {
	const navigate = useNavigate();
	const handleCreatePostBtnClick = () => {
		navigate('/create');
	};
	const { user } = useAuthContext();
	return (
		<div className="sidebarContainer">
			<Button wording="張貼動態" style="primary" handleClick={handleCreatePostBtnClick}></Button>
			<SidebarItem avatar={user.avatar} wording={user.name} handleClick={() => navigate('/profile')} />
			{SIDEBAR_ITEM.map((item) => (
				<SidebarItem
					key={item.order}
					icon={item.icon}
					wording={item.wording}
					handleClick={() => navigate(`${item.link}`)}
				/>
			))}
		</div>
	);
};

export default Sidebar;
