import './title.scss';

type TitleProps = {
	wording: string;
};

const Title = ({ wording }: TitleProps) => {
	return <div className="titleContainer">{wording}</div>;
};

export default Title;
