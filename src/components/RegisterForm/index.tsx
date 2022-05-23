import './registerForm.scss';
import Button from '../Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useLoginContext } from '../../context/login';
import { useAuthContext } from '../../context/auth';

interface IFormValues {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterForm = () => {
	const [isError, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const { swtichMode, navigateTo, from } = useLoginContext();
	const { signup } = useAuthContext();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		const { username, email, password, confirmPassword } = data;
		await signup(
			{ name: username, email, password, confirmPassword },
			() => {
				navigateTo(from, { replace: true });
			},
			(msg: string) => {
				setError(true);
				setErrorMessage(msg);
			},
		);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="loginFormContainer">
			<div className="loginFormContainer__inputGroup">
				<input
					placeholder="暱稱"
					{...register('username', {
						required: '暱稱尚未填寫',
					})}
				/>
				{errors.username?.message !== '' && <span className="errorMessage">{errors.username?.message}</span>}
			</div>
			<div className="loginFormContainer__inputGroup">
				<input
					placeholder="Email"
					{...register('email', {
						required: '信箱尚未填寫',
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: '錯誤的 Email 格式',
						},
					})}
				/>
				{errors.email?.message !== '' && <span className="errorMessage">{errors.email?.message}</span>}
			</div>
			<div className="loginFormContainer__inputGroup">
				<input placeholder="Password" type="password" {...register('password', { required: '密碼尚未填寫' })} />
				{errors.password?.message !== '' && <span className="errorMessage">{errors.password?.message}</span>}
			</div>
			<div className="loginFormContainer__inputGroup">
				<input
					placeholder="ConfirmPassword"
					type="password"
					{...register('confirmPassword', { required: '再次輸入密碼尚未填寫' })}
				/>
				{errors.confirmPassword?.message !== '' && (
					<span className="errorMessage">{errors.confirmPassword?.message}</span>
				)}
			</div>
			{isError && <span className="errorMessage errorMessage-apis">{errorMessage}</span>}
			<Button wording="註冊" style="primary" />
			<Button wording="登入" handleClick={swtichMode} style="secondry" />
		</form>
	);
};

export default RegisterForm;
