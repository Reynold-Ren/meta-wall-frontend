import { useState, useRef } from 'react';
import './dropmenu.scss';
import defaultAvatar from '../../assets/user_default.png';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const DropMenu = () => {
	const [isDropMenuShow, setDropMenuShow] = useState<boolean>(false);
	const { signout, user } = useAuthContext();
	const navigate = useNavigate();
	const nodeRef = useRef(null);

	return (
		<div
			className="dropmenuContainer"
			onMouseOver={() => setDropMenuShow(true)}
			onMouseLeave={() => setDropMenuShow(false)}
		>
			<div className="dropmenuContainer__avatar">
				<img src={user.photo === '' ? defaultAvatar : user.photo} alt="" />
			</div>
			<div className="dropmenuContainer__role">Member</div>
			<CSSTransition in={isDropMenuShow} timeout={2000} classNames="dropmenu" nodeRef={nodeRef} unmountOnExit>
				<ul className="dropmenuContainer__list" ref={nodeRef}>
					<li className="dropmenuContainer__listItem">
						<Link to="/">我的貼文牆</Link>
					</li>
					<li className="dropmenuContainer__listItem">
						<Link to="/profile">修改個人資料</Link>
					</li>
					<li
						className="dropmenuContainer__listItem"
						onClick={() =>
							signout(() => {
								navigate('/login');
							})
						}
					>
						登出
					</li>
				</ul>
			</CSSTransition>
		</div>
	);
};

export default DropMenu;
