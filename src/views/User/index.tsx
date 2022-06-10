import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Empty from '../../components/Empty';
import { Posts } from '../../apis/apis';
import { PostResponseType } from '../../models/post.interface';
import UserInfo from '../../components/UserInfo';
import Post from '../../components/Post';
import { useAuthContext } from '../../context/auth';

const User = () => {
	const [userInfo, setUserInfo] = useState<{
		_id: string;
		name: string;
		followers: {
			user: string;
			createdAt: string;
		}[];
		avatar: string;
	}>({
		_id: '',
		name: '',
		followers: [],
		avatar: '',
	});
	const [posts, setPosts] = useState<PostResponseType[]>([]);
	const { id } = useParams();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchPost = async () => {
			const result = await Posts.getSpecUser({ id: id as string });

			if (result.status) {
				setPosts(result.data.post);
				setUserInfo(result.data.user);
			}
		};

		fetchPost();
	}, []);

	return (
		<div>
			{user.id !== id && <UserInfo userInfo={userInfo} />}
			{posts.length === 0 ? <Empty type="USER" /> : posts.map((post) => <Post key={post._id} post={post} />)}
		</div>
	);
};

export default User;
