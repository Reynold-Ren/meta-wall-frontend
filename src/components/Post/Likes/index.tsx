import './likes.scss';
import { BiLike } from 'react-icons/bi';
import classnames from 'classnames';

type LikesProps = {
	likesNum: number;
	isLiked: boolean | null;
	handleClickLikes: () => void;
};

const Likes = ({ likesNum, isLiked, handleClickLikes }: LikesProps) => {
	const activeClass = classnames({
		isLiked: isLiked,
		likesContainer: true,
	});

	return (
		<div className={activeClass} onClick={handleClickLikes}>
			<BiLike />
			{likesNum === 0 ? '成為第一個按讚的朋友' : likesNum}
		</div>
	);
};

export default Likes;
