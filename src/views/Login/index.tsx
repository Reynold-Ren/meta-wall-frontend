import './login.scss';
import Logo from '../../assets/login/logo.png';
import Illustration from '../../assets/login/illustration.svg';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import ForgetForm from '../../components/ForgetForm';
import ResetPassword from '../../components/Tab/ResetPassword';
import { useState, useEffect } from 'react';
import { LoginContext } from '../../context/login';
import { useLocalStorage } from '../../helpers/useLocalSotrage';
import { useAuthContext } from '../../context/auth';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LocationProps } from '../../models/react-router-interface';
import { SOCIAL_LOGIN_ITEM } from '../../constants/socialLogin';

const Login = () => {
	const [currentMode, setCurrentMode] = useState<string>('login');
	const [searchParams] = useSearchParams();
	const { setUser } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation() as unknown as LocationProps;
	const from = location.state?.from?.pathname || '/';
	const token = searchParams.get('token') as string;

	useEffect(() => {
		console.log(token);
		if (useLocalStorage.tokenIsExists()) {
			setUser(JSON.parse(useLocalStorage.getUser()));
			navigate(from, { replace: true });
		}

		if (token) {
			setCurrentMode('reset');
		}
	}, []);

	const navigateTo = (from: string): void => {
		navigate(from, { replace: true });
	};

	const swtichMode = (mode: string): void => {
		setCurrentMode(mode);
	};

	const generateTitle = () => {
		switch (currentMode) {
			case 'login':
				return '到元宇宙展開全新社交圈';
			case 'register':
				return '註冊';
			case 'forget':
				return '忘記密碼';
			case 'reset':
				return '重設密碼';
		}
	};

	const generateForm = () => {
		switch (currentMode) {
			case 'login':
				return <LoginForm />;
			case 'register':
				return <RegisterForm />;
			case 'forget':
				return <ForgetForm />;
			case 'reset':
				return <ResetPassword token={token} />;
		}
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
						<h2>{generateTitle()}</h2>
					</div>
					<div className="loginContainer__form-input">{generateForm()}</div>
					<div className="socialLoginContainer">
						{SOCIAL_LOGIN_ITEM.map((item) => (
							<a href={item.link} key={item.title}>
								{item.icon}
							</a>
						))}
					</div>
				</div>
			</div>
		</LoginContext.Provider>
	);
};

export default Login;
