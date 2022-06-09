import { useState, useEffect } from 'react';
import './appContainer.scss';
import Header from '../Header';
import Sidebar from '../../components/Sidebar';
import { useAuthContext } from '../../context/auth';
import { useLocation } from 'react-router-dom';

const AppContainer = (props: { children: React.ReactNode }) => {
	const [isExcludeSidebar, setExcludeSidebar] = useState<boolean>(false);
	const { children } = props;
	const { user } = useAuthContext();
	const location = useLocation();
	const excludeSideBarRoute = ['/shop'];

	useEffect(() => {
		setExcludeSidebar(!excludeSideBarRoute.includes(location.pathname));
	}, [location]);

	return (
		<div className="appContainer">
			{user && <Header />}
			{user ? (
				<main className="appContainer__body appContainer__body-isLogin">
					{children}
					{isExcludeSidebar && <Sidebar />}
				</main>
			) : (
				<main className="appContainer__body">{children}</main>
			)}
		</div>
	);
};

export default AppContainer;
