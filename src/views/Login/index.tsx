import './login.scss';
import Logo from '../../assets/login/logo.png';
import Illustration from '../../assets/login/illustration.svg';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import { useState } from 'react';
import { LoginContext } from '../../context/login';

const Login = () => {
	const [isRegisterMode, setRegisterMode] = useState<boolean>(false);

	const swtichMode = (): void => {
		setRegisterMode(!isRegisterMode);
	};

	return (
		<LoginContext.Provider value={{ swtichMode }}>
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
