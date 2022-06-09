import { useState, useEffect } from 'react';
import Title from '../../components/Title';
import ListItem from '../../components/ListItem';
import Empty from '../../components/Empty';
import { User } from '../../apis/apis';
import { UserFieldType } from '../../models/user.interface';

type FollowListType = {
	user: UserFieldType;
	createdAt: string;
}[];

const Follow = () => {
	const [followList, setfollowList] = useState<FollowListType>([]);
	useEffect(() => {
		const fetchFollowList = async () => {
			const result = await User.getFollowList();
			result.status ? setfollowList(result.data[0].following) : [];
		};

		fetchFollowList();
	}, []);

	return (
		<div>
			<Title wording="追蹤名單" />
			{followList.length !== 0 ? (
				followList.map((followUser) => <ListItem key={followUser.user._id} type="follows" data={followUser} />)
			) : (
				<Empty type="FOLLOWS" />
			)}
		</div>
	);
};

export default Follow;
