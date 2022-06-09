import { FiArrowRightCircle } from 'react-icons/fi';
import { BiLike } from 'react-icons/bi';
import { Posts } from '../../apis/apis';

type LikesAddOnProps = {
	postId: string;
	remove: (id: string) => void;
};

const LikesAddOn = ({ postId, remove }: LikesAddOnProps) => {
	const disLike = async () => {
		const result = await Posts.unLike({ _id: postId });
		if (result.status) {
			remove(postId);
		}
	};
	return (
		<div className="likesAddOnContainer">
			<div className="cancleLikeBtn" onClick={disLike}>
				<BiLike />
				<span>取消</span>
			</div>
			<div className="getPostDetailBtn">
				<FiArrowRightCircle />
				<span>查看</span>
			</div>
		</div>
	);
};

export default LikesAddOn;
