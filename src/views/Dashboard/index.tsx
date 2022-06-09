import { useState, useEffect } from 'react';
import Filters from '../../components/Filters';
import Empty from '../../components/Empty';
import Post from '../../components/Post';
import { Posts } from '../../apis/apis';
import { PostResponseType } from '../../models/post.interface';

const Dashboard = () => {
	const [posts, setPosts] = useState<PostResponseType[]>([]);
	const [option, setOption] = useState<string>('');
	const [query, setQuery] = useState<string>('');

	const handleOptionChange = async (evt: React.ChangeEvent<HTMLSelectElement>) => {
		setOption(evt.target.value);
		const queryObj: { [key: string]: string } = {};
		const params = evt.target.value.split('-');
		queryObj.type = params[0];
		queryObj.timeSort = params[1];
		if (query !== '') {
			queryObj.q = query;
		}
		const result = await Posts.getAll(queryObj);
		if (result.status) {
			setPosts(result.data);
		}
	};

	const handleQueryBtnClick = async () => {
		const queryObj: { [key: string]: string } = {};
		if (option !== '') {
			const params = option.split('-');
			queryObj.type = params[0];
			queryObj.timeSort = params[1];
		}
		queryObj.q = query;
		const result = await Posts.getAll(queryObj);
		if (result.status) {
			setPosts(result.data);
		}
	};

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
			<Filters handleSelect={handleOptionChange} handleInput={setQuery} handleQueryBtnClick={handleQueryBtnClick} />
			{posts.length === 0 ? <Empty type="POSTS" /> : posts.map((post) => <Post key={post._id} post={post} />)}
		</div>
	);
};

export default Dashboard;
