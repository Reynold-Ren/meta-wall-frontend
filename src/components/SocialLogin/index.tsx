import { useAuthContext } from '../../context/auth';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../helpers/useLocalSotrage';
import defaultAvatar from '../../assets/user_default.png';

const SocialLogin = ({ children }: { children: JSX.Element }) => {
	const location = useLocation();
	const { setUser } = useAuthContext();

	if (location.search !== '' && location.search.includes('token')) {
		const [searchParams] = useSearchParams();
		const token = searchParams.get('token') as string;
		const id = searchParams.get('id') as string;
		const name = searchParams.get('name') as string;
		const avatar = searchParams.get('avatar') === 'undefined' ? defaultAvatar : (searchParams.get('avatar') as string);

		setUser({
			id,
			name,
			avatar,
		});

		useLocalStorage.setUser(JSON.stringify({ id, name, avatar }));
		useLocalStorage.setToken(token);
	}

	return children;
};

export default SocialLogin;
