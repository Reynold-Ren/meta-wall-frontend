import './appContainer.scss';
import Header from '../Header';
import Sidebar from '../../components/Sidebar';
import { useAuthContext } from '../../context/auth';

const AppContainer = (props: { children: React.ReactNode }) => {
	const { children } = props;
	const { user } = useAuthContext();

	return (
		<div className="appContainer">
			{user && <Header />}
			{user ? (
				<main className="appContainer__body appContainer__body-isLogin">
					{children}
					<Sidebar />
				</main>
			) : (
				<main className="appContainer__body">{children}</main>
			)}
		</div>
	);
};

export default AppContainer;
