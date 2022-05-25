import './login.scss';
import Logo from '../../assets/login/logo.png';
import Illustration from '../../assets/login/illustration.svg';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import { useState, useEffect } from 'react';
import { LoginContext } from '../../context/login';
import { useLocalStorage } from '../../helpers/useLocalSotrage';
import { useAuthContext } from '../../context/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocationProps } from '../../models/reack-router-interface';

const Login = () => {
	const [isRegisterMode, setRegisterMode] = useState<boolean>(false);
	const { setUser } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation() as unknown as LocationProps;
	const from = location.state?.from?.pathname || '/';

	useEffect(() => {
		if (useLocalStorage.tokenIsExists()) {
			setUser(JSON.parse(useLocalStorage.getUser()));
			navigate(from, { replace: true });
		}
	}, []);

	const navigateTo = (from: string): void => {
		navigate(from, { replace: true });
	};

	const swtichMode = (): void => {
		setRegisterMode(!isRegisterMode);
	};

	const checkErrors = (errors: Record<string, never>) => (Object.keys(errors).length === 0 ? false : true);

	return (
		<LoginContext.Provider value={{ swtichMode, navigateTo, from, checkErrors }}>
			<div className="loginContainer">
				<div className="loginContainer__illustration">
					<img src={Illustration} alt="" />
				</div>
				<div className="loginContainer__form">
					<div className="loginContainer__form-logo">
						<img src={Logo} alt="" />
						<h2>{isRegisterMode ? '註冊' : '到元宇宙展開全新社交圈'}</h2>
					</div>
					<div className="loginContainer__form-input">{isRegisterMode ? <RegisterForm /> : <LoginForm />}</div>
				</div>
			</div>
		</LoginContext.Provider>
	);
};

export default Login;
