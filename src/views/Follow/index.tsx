import Title from '../../components/Title';
import ListItem from '../../components/ListItem';

const Follow = () => {
	return (
		<div>
			<Title wording="追蹤名單" />
			{[...Array(5)].map((_, i) => (
				<ListItem key={i} />
			))}
		</div>
	);
};

export default Follow;
