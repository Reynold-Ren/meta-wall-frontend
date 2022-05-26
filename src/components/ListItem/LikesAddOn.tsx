import { FiArrowRightCircle } from 'react-icons/fi';
import { BiLike } from 'react-icons/bi';

const LikesAddOn = () => {
	return (
		<div className="likesAddOnContainer">
			<div className="cancleLikeBtn">
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
