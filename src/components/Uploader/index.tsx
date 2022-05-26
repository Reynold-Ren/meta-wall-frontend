import './uploader.scss';
import { upload } from '../../apis/apis';

type UploaderProps = {
	type: 'image' | 'avatar';
	handleUploadFinnish: (status: boolean, msg: string) => void;
};

const Uploader = ({ type = 'image', handleUploadFinnish }: UploaderProps) => {
	const handleFileUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
		const file = (evt.target as HTMLInputElement).files || [];
		const formData = new FormData();
		formData.append('file', file[0]);
		const result = await upload(formData);
		const { status = false, message = '上傳發生異常' } = result;
		handleUploadFinnish(status, message);
	};

	return (
		<div className="uploaderContainer">
			<label htmlFor="upload">上傳{type == 'avatar' ? '大頭貼' : '圖片'}</label>
			<input id="upload" type="file" onChange={handleFileUpload} />
		</div>
	);
};

export default Uploader;
