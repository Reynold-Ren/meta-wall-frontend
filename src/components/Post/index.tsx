import './post.scss';
import { useState, useEffect } from 'react';
import Likes from './Likes';
import Comments from './Comments';
import defaultAvatar from '../../assets/user_default.png';
import { Posts } from '../../apis/apis';
import { useAuthContext } from '../../context/auth';

type PostProps = {
	post: {
		_id: string;
		name: string;
		content: string;
		image: string;
		likes: string[];
	};
};

const Post = ({ post }: PostProps) => {
	const [isLiked, setLike] = useState<boolean>(null!);
	const [likesLength, setLikesLength] = useState<number>(0);
	const [likeList, setLikeList] = useState<string[]>([]);
	const { user } = useAuthContext();
	const { _id, name, image, content, likes } = post;

	useEffect(() => {
		likes.includes(user.id) ? setLike(true) : setLike(false);
		setLikeList(likes);
		setLikesLength(likeList.length);
	}, []);

	useEffect(() => {
		setLikesLength(likeList.length);
	}, [likeList]);

	const handleClickLikes = async () => {
		const copyArr = Array.from(likeList);
		if (isLiked) {
			const result = await Posts.unLike({ _id });
			result.status ? setLike(false) : null;
			setLikeList(copyArr.filter((likeUserID) => likeUserID !== user.id));
		} else {
			const result = await Posts.addLike({ _id });
			result.status ? setLike(true) : null;
			copyArr.push(user.id);
			setLikeList(copyArr);
		}
	};

	return (
		<div className="postContainer">
			<div className="postContainer__header">
				<div className="postContainer__header-avatar">
					<img src={defaultAvatar} alt="" />
				</div>
				<div className="postContainer__header-info">
					<h3>{name}</h3>
					<span>2022/1/10 12:00</span>
				</div>
			</div>
			<div className="postContainer__body">
				<p className="postContainer__body-content">{content}</p>
				{image && (
					<div className="postContainer__body-images">
						<img src={image} alt="" />
					</div>
				)}
				<Likes likesNum={likesLength} handleClickLikes={handleClickLikes} isLiked={isLiked} />
			</div>
			<div className="postContainer__footer">
				<Comments />
			</div>
		</div>
	);
};

export default Post;
