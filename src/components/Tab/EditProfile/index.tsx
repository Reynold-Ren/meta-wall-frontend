import './editProfile.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Button from '../../Button';
import Uploader from '../../Uploader';
import defaultAvatar from '../../../assets/user_default.png';
import { User } from '../../../apis/apis';
import { useAuthContext } from '../../../context/auth';
import { useLocalStorage } from '../../../helpers/useLocalSotrage';

interface IFormValues {
	photo: string;
	name: string;
	gender: 'male' | 'female' | 'x';
}

const EditProfile = () => {
	const [imageUrl, setImageUrl] = useState<string>('');
	const [avatar, setAvatar] = useState<string>(defaultAvatar);
	const [isError, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const { user, setUser } = useAuthContext();
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<IFormValues>();

	useEffect(() => {
		setValue('name', user.name);
		if (user.photo !== '') {
			setAvatar(user.photo);
		}
	}, []);

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		const { name, gender, photo = '' } = data;
		const result = await User.editProfile({ name, gender, photo });
		if (result.status) {
			setUser({ ...user, name, photo });
			useLocalStorage.updateUser({ name, photo });
		} else {
			setError(true);
			setErrorMessage(result.message);
		}
	};

	const checkErrors = () => (Object.keys(errors).length === 0 ? false : true);

	const getUploadResult = (status: boolean, msg: string): void => {
		if (status) {
			setImageUrl(msg);
			setAvatar(msg);
			setValue('photo', msg);
		} else {
			setError(true);
			setErrorMessage(msg);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="editProfileFormContainer">
			<div className="editProfileFormContainer__inputGroup">
				<div className="editProfileFormContainer__inputGroup-avatar">
					<img src={avatar} alt="" />
				</div>
				<Uploader type="avatar" handleUploadFinnish={getUploadResult} />
			</div>
			<div className="editProfileFormContainer__inputGroup">
				<label>暱稱</label>
				<input
					placeholder="請輸入暱稱"
					{...register('name', {
						required: '名稱為必要資訊',
						minLength: {
							value: 1,
							message: '名稱請大於 1 個字',
						},
						maxLength: {
							value: 50,
							message: '名稱長度過長，最多只能 50 個字',
						},
						validate: {
							trim: (v) => v.trim() !== '' || '名稱為必要資訊',
						},
					})}
				/>
				{errors.name?.message !== '' && <span className="errorMessage">{errors.name?.message}</span>}
			</div>
			<div className="editProfileFormContainer__inputGroup">
				<label>性別</label>
				<div className="editProfileFormContainer__inputGroup__radioContainer">
					<label htmlFor="field-male">
						<input {...register('gender')} type="radio" name="gender" value="male" id="field-male" />
						<span className="checkmark"></span>
						男性
					</label>
					<label htmlFor="field-female">
						<input {...register('gender')} type="radio" name="gender" value="female" id="field-female" />
						<span className="checkmark"></span>
						女性
					</label>
					<label htmlFor="field-x">
						<input {...register('gender')} type="radio" name="gender" value="x" id="field-x" />
						<span className="checkmark"></span>
						不想透露
					</label>
				</div>
			</div>
			{isError && <span className="errorMessage errorMessage-apis">{errorMessage}</span>}
			<Button wording="送出更新" style="primary" layout="EditProfile" disabled={checkErrors()} />
		</form>
	);
};

export default EditProfile;
