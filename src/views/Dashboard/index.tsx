import { useState, useEffect } from 'react';
import Filters from '../../components/Filters';
import Empty from '../../components/Empty';
import Post from '../../components/Post';
import { Posts } from '../../apis/apis';
import { FetchPostsType } from '../../models/post.interface';

const Dashboard = () => {
	const [posts, setPosts] = useState<FetchPostsType>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const result = await Posts.getAll();

			if (result.status) {
				setPosts(result.data);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div>
			<Filters />
			{posts.length === 0 ? <Empty type="POSTS" /> : posts.map((post) => <Post key={post._id} post={post} />)}
		</div>
	);
};

export default Dashboard;
