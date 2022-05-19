import './loginForm.scss';
import Button from '../Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useLoginContext } from '../../context/login';

interface IFormValues {
	email: string;
	password: string;
}

const LoginForm = () => {
	const [isError, setError] = useState<boolean>(false);
	const { swtichMode } = useLoginContext();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormValues>();

	const onClickRegisterButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
		console.log('event', evt.target);
	};

	const onSubmit: SubmitHandler<IFormValues> = (data) => {
		alert(JSON.stringify(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="loginFormContainer">
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
				<input type="password" placeholder="Password" {...register('password', { required: '密碼尚未填寫' })} />
				{errors.password?.message !== '' && <span className="errorMessage">{errors.password?.message}</span>}
			</div>
			{isError && <span className="errorMessage"></span>}
			<Button wording="登入" handleClick={onClickRegisterButton} style="primary" />
			<Button wording="註冊" handleClick={swtichMode} style="secondry" />
		</form>
	);
};

export default LoginForm;
