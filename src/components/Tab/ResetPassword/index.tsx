import './resetPassword.scss';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../../apis/apis';
import { useLoginContext } from '../../../context/login';
import Button from '../../Button';
import Modal from 'react-modal';
import { CUSTOM_STYLES } from '../../../constants/modalStyle';

interface IFormValues {
	password: string;
	confirmPwd: string;
}

type ResetPasswordPropsType = {
	token?: string;
};

Modal.setAppElement('#root');

const ResetPassword = ({ token }: ResetPasswordPropsType) => {
	const [isError, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const { swtichMode } = useLoginContext();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		const { password, confirmPwd } = data;
		if (token) {
			const result = await User.resetPassword({ token, password, confirmPassword: confirmPwd });
			if (result.status) {
				openModal();
			} else {
				setError(true);
				setErrorMessage(result.message);
			}
		} else {
			const result = await User.updatePassword({ password, confirmPassword: confirmPwd });
			if (result.status) {
				console.log(result);
			} else {
				setError(true);
				setErrorMessage(result.message);
			}
		}
	};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
		swtichMode('login');
	}

	const checkErrors = () => (Object.keys(errors).length === 0 ? false : true);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="resetFormContainer">
				<div className="resetFormContainer__inputGroup">
					<label>輸入新密碼</label>
					<input
						type="password"
						placeholder="請輸入新密碼"
						{...register('password', {
							required: '新密碼尚未填寫',
						})}
					/>
					{errors.password?.message !== '' && <span className="errorMessage">{errors.password?.message}</span>}
				</div>
				<div className="resetFormContainer__inputGroup">
					<label>再次輸入</label>
					<input
						type="password"
						placeholder="再次輸入新密碼"
						{...register('confirmPwd', { required: '請再次輸入密碼' })}
					/>
					{errors.confirmPwd?.message !== '' && <span className="errorMessage">{errors.confirmPwd?.message}</span>}
				</div>
				{isError && <span className="errorMessage errorMessage-apis">{errorMessage}</span>}
				<Button wording="重設密碼" style="primary" layout="EditProfile" disabled={checkErrors()} />
				<Button wording="回到登入頁" handleClick={() => swtichMode('login')} style="secondry" />
			</form>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={CUSTOM_STYLES} contentLabel="Modal">
				<h3 className="forgetPasswordModal-title">通知</h3>
				<h4 className="forgetPasswordModal-subtitle">重設成功！</h4>
				<Button wording="關閉" style="primary" handleClick={closeModal} />
			</Modal>
		</>
	);
};

export default ResetPassword;
