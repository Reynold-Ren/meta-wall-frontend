import './appContainer.scss';
import Header from '../Header';
import { useAuthContext } from '../../context/auth';

const AppContainer = (props: { children: React.ReactNode }) => {
	const { children } = props;
	const { user } = useAuthContext();

	return (
		<div className="appContainer">
			{user && <Header />}
			<main className="appContainer__body">{children}</main>
		</div>
	);
};

export default AppContainer;
