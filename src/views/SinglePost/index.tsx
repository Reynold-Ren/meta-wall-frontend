import './singlePost.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Posts } from '../../apis/apis';
import Post from '../../components/Post';
import Empty from '../../components/Empty';
import { PostResponseType } from '../../models/post.interface';

const SinglePost = () => {
	const { id } = useParams();
	const [data, setData] = useState<PostResponseType>();

	useEffect(() => {
		const fetchPost = async () => {
			const result = await Posts.getOne({ id: id as string });

			if (result.status) {
				setData(result.data);
			}
		};

		fetchPost();
	}, []);
	return (
		<div className="singlePostContainer">{data ? <Post key={data?._id} post={data} /> : <Empty type="POST" />}</div>
	);
};

export default SinglePost;
