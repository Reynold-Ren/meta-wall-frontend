type FollowsAddOnProps = {
	time?: string;
};

const FollowsAddOn = ({ time = '2022-05-01T06:40:03.677Z' }: FollowsAddOnProps) => {
	const calculateFollowsTime = () => {
		const targetTS = new Date(time).getTime();
		const currentTS = Date.now();
		const diffMins = Math.floor((currentTS - targetTS) / 1000);

		return diffMins > 60 * 60 * 24 ? Math.floor(diffMins / (60 * 60 * 24)) : 1;
	};
	return <div className="followsAddOnContainer">您已追蹤 {calculateFollowsTime()} 天！</div>;
};

export default FollowsAddOn;
