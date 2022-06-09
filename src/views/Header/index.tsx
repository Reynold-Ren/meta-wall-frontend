import './header.scss';
import Logo from '../../assets/logo.svg';
import DropMenu from '../../components/DropMenu';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className="headerWrap">
			<div className="headerContainer">
				<Link to="/shop">
					<img src={Logo} alt="" />
				</Link>
				<div className="headerContainer__logo">
					<Link to="/">
						<img src={Logo} alt="" />
					</Link>
				</div>
				<div className="headerContainer__dropMenu">
					<DropMenu />
				</div>
			</div>
		</header>
	);
};

export default Header;
