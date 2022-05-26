import Title from '../../components/Title';
import ListItem from '../../components/ListItem';

const Likes = () => {
	return (
		<div>
			<Title wording="我按讚的貼文" />
			{[...Array(5)].map((_, i) => (
				<ListItem key={i} type="likes" />
			))}
		</div>
	);
};

export default Likes;
