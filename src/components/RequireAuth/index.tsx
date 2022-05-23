import { useAuthContext } from '../../context/auth';
import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const location = useLocation();
	const { user } = useAuthContext();

	console.log(user);

	if (!user?.token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default RequireAuth;
