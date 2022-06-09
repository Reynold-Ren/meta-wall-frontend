import { useState, useEffect } from 'react';
import Title from '../../components/Title';
import ListItem from '../../components/ListItem';
import Empty from '../../components/Empty';
import { User } from '../../apis/apis';
import { UserFieldType } from '../../models/user.interface';

type likeListType = {
	_id: string;
	userId: UserFieldType;
	createdAt: string;
}[];

const Likes = () => {
	const [likeList, setLikeList] = useState<likeListType>([]);
	useEffect(() => {
		const fetchLikeList = async () => {
			const result = await User.getLikesList();
			result.status ? setLikeList(result.data) : [];
		};

		fetchLikeList();
	}, []);

	const removeSpecificPostFromLists = (id: string) => {
		const copyArr = Array.from(likeList);
		setLikeList(copyArr.filter((item) => item._id !== id));
	};

	return (
		<div>
			<Title wording="我按讚的貼文" />
			{likeList.length !== 0 ? (
				likeList.map((likePost) => (
					<ListItem key={likePost._id} type="likes" remove={removeSpecificPostFromLists} data={likePost} />
				))
			) : (
				<Empty type="LIKES" />
			)}
		</div>
	);
};

export default Likes;
