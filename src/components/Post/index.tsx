import './post.scss';
import { useState, useEffect } from 'react';
import Likes from './Likes';
import Comments from './Comments';
import defaultAvatar from '../../assets/user_default.png';
import { Posts } from '../../apis/apis';
import { useAuthContext } from '../../context/auth';
import { PostResponseType } from '../../models/post.interface';
import moment from 'moment';

interface PostPropsType {
	post: PostResponseType;
}

const Post = ({ post }: PostPropsType) => {
	const [isLiked, setLike] = useState<boolean>(null!);
	const [likesLength, setLikesLength] = useState<number>(0);
	const [likeList, setLikeList] = useState<string[]>([]);
	const { user } = useAuthContext();
	const { _id, image, content, likes, createdAt } = post;
	const { name, avatar } = post.userId;

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

	const timeFormat = (createdTime: string) => {
		const theDay = moment(createdTime);
		return theDay.format('YYYY-MM-DD HH:mm');
	};

	return (
		<div className="postContainer">
			<div className="postContainer__header">
				<div className="postContainer__header-avatar">
					<img src={avatar !== '' ? avatar : defaultAvatar} alt="" />
				</div>
				<div className="postContainer__header-info">
					<h3>{name}</h3>
					<span>{timeFormat(createdAt)}</span>
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
