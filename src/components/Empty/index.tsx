import './empty.scss';
import { EMPTY_WORDING } from '../../constants/emptyWording';

type EmptyProps = {
	type: string;
};

const Empty = ({ type }: EmptyProps) => {
	const emptyType = EMPTY_WORDING[type];
	return (
		<div className="emptyContainer">
			<div className="emptyContainer__header">
				<span className="red"></span>
				<span className="yellow"></span>
				<span className="green"></span>
			</div>
			<div className="emptyContainer__body">{emptyType}</div>
		</div>
	);
};

export default Empty;
