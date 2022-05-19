import './appContainer.scss';

const AppContainer = (props: { children: React.ReactNode }) => {
	const { children } = props;
	return <main className="app__container">{children}</main>;
};

export default AppContainer;
