import { useState, useEffect } from 'react';
import Title from '../../components/Title';
import ListItem from '../../components/ListItem';
import Empty from '../../components/Empty';
import { User } from '../../apis/apis';
import { LikesType } from '../../models/user.interface';

type LikesList = {
	_id: string;
	userId: LikesType;
	createdAt: string;
};

const Likes = () => {
	const [likeList, setLikeList] = useState<LikesList[]>([]);
	useEffect(() => {
		const fetchLikeList = async () => {
			const result = await User.getLikesList();
			result.status ? setLikeList(result.data) : null;
		};

		fetchLikeList();
	}, []);
	return (
		<div>
			<Title wording="我按讚的貼文" />
			{likeList.map((likePost) => (
				<ListItem key={likePost._id} type="likes" data={likePost.userId} />
			))}
		</div>
	);
};

export default Likes;
