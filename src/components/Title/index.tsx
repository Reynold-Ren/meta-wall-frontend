import './title.scss';
import classnames from 'classnames';

type TitleProps = {
	wording: string;
	subTitle?: string;
	size?: string;
};

const Title = ({ wording, size = 'medium', subTitle }: TitleProps) => {
	const activeClass = classnames({
		large: size === 'large',
		titleContainer: true,
	});
	return (
		<div className={activeClass}>
			{wording}
			{subTitle && <p>{subTitle}</p>}
		</div>
	);
};

export default Title;
