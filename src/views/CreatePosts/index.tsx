import './createPosts.scss';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { upload } from '../../apis/apis';
import { IoCloseSharp } from 'react-icons/io5';
import { Post } from '../../apis/apis';
import { useNavigate } from 'react-router-dom';

interface IFormValues {
	id: string;
	content: string;
	image: string;
}

const CreatePosts = () => {
	const [imageUrl, setImageUrl] = useState<string>('');
	const [isError, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		const { content, image } = data;
		const result = await Post.create({ content, image });
		if (result.status) {
			navigate('/');
		} else {
			setError(true);
			setErrorMessage(result.message);
		}
	};

	const handleRemoveImg = () => {
		setImageUrl('');
	};

	const handleFileUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
		const file = (evt.target as HTMLInputElement).files || [];
		const formData = new FormData();
		formData.append('file', file[0]);
		const result = await upload(formData);
		if (result.status) {
			setImageUrl(result.message);
			setValue('image', result.message);
		} else {
			setError(true);
			setErrorMessage(result.message);
		}
	};

	const checkErrors = () => (Object.keys(errors).length === 0 ? false : true);

	return (
		<div>
			<Title wording="張貼動態" />
			<form onSubmit={handleSubmit(onSubmit)} className="postFormContainer">
				<div className="postFormContainer__inputGroup">
					<label>貼文內容</label>
					<textarea
						placeholder="輸入您的貼文內容"
						{...register('content', {
							required: '貼文內容尚未填寫',
						})}
					></textarea>
					{errors.content?.message !== '' && <span className="errorMessage">{errors.content?.message}</span>}
				</div>
				<div className="postFormContainer__inputGroup">
					<label htmlFor="upload">上傳圖片</label>
					<input id="upload" type="file" onChange={handleFileUpload} />
					{imageUrl && (
						<div className="imageContainer">
							<div className="removeBtn" onClick={handleRemoveImg}>
								<IoCloseSharp />
							</div>
							<img src={imageUrl} alt="" />
						</div>
					)}
				</div>
				<input {...register('image')} hidden />
				{isError && <span className="errorMessage errorMessage-apis">{errorMessage}</span>}
				<Button wording="送出貼文" style="primary" layout="Post" disabled={checkErrors()} />
			</form>
		</div>
	);
};

export default CreatePosts;
