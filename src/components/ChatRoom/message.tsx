import { MessageType } from '../../models/message.interface';
import { useAuthContext } from '../../context/auth';
import { FaCrown } from 'react-icons/fa';
import classnames from 'classnames';
import moment from 'moment';

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

const Message = ({ content, createdAt, userId }: MessageType) => {
	const { user } = useAuthContext();
	const { avatar, name, coin } = userId;
	const timeFormat = (createdTime: string) => {
		const theDay = moment(createdTime);
		return theDay.fromNow(true);
	};
	const activeClass = classnames({
		isSelf: user.id === userId._id,
		messageContainer: true,
	});

	return (
		<div className={activeClass}>
			<div className="messageContainer__avatarContainer">
				{coin > 100 && <FaCrown />}
				<div className="messageContainer__avatar">
					<img src={avatar} alt="" />
				</div>
			</div>
			<div className="messageContainer__info">
				<div className="messageContainer__info__head">
					<span className="messageContainer__info__head-name">{name}</span>
					<span className="messageContainer__info__head-time">{timeFormat(createdAt)}前</span>
				</div>
				<div className="messageContainer__info-body">{content}</div>
			</div>
		</div>
	);
};

export default Message;
