import moment from 'moment';

type FollowsAddOnProps = {
	time?: string;
};

moment.updateLocale('zh', {
	relativeTime: {
		s: '%d 秒',
		ss: '%d 秒',
		m: '1 分鐘',
		mm: '%d 分鐘',
		h: '1 小時',
		hh: '%d 小時',
		d: '%d 天',
		dd: '%d 天',
		w: '1 週',
		ww: '%d 週',
		M: '1 個月',
		MM: '%d 月',
		y: '1 年',
		yy: '%d 年',
	},
});

const FollowsAddOn = ({ time }: FollowsAddOnProps) => {
	const calculateFollowsTime = () => {
		const theDay = moment(time);
		return theDay.fromNow(true);
	};
	return <div className="followsAddOnContainer">您已追蹤 {calculateFollowsTime()}！</div>;
};

export default FollowsAddOn;
