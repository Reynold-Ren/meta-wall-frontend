import './resetForm.scss';
import Button from '../Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useLoginContext } from '../../context/login';
import { User } from '../../apis/apis';
import Modal from 'react-modal';
import { CUSTOM_STYLES } from '../../constants/modalStyle';

interface IFormValues {
	email: string;
}

Modal.setAppElement('#root');

const ForgetForm = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isError, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const { swtichMode, checkErrors } = useLoginContext();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		const { email } = data;
		const result = await User.forgetPassword({ email });
		if (result.status) {
			openModal();
		} else {
			setError(true);
			setErrorMessage(result.message);
		}
	};

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="resetFormContainer">
				<div className="resetFormContainer__inputGroup">
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
				{isError && <span className="errorMessage errorMessage-apis">{errorMessage}</span>}
				<Button wording="送出" style="primary" disabled={checkErrors(errors)} />
				<Button wording="返回登入" handleClick={() => swtichMode('login')} style="secondry" />
			</form>
			<Modal isOpen={isOpen} onRequestClose={closeModal} style={CUSTOM_STYLES} contentLabel="Modal">
				<h3 className="resetPasswordModal-title">通知</h3>
				<h4 className="resetPasswordModal-subtitle">重設密碼信件已經寄出！</h4>
			</Modal>
		</>
	);
};

export default ForgetForm;
