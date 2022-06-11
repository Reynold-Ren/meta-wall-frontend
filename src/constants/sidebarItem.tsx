import { BiLike, BiBell, BiCoin, BiDonateBlood, BiCoinStack } from 'react-icons/bi';
import { AiOutlineMessage } from 'react-icons/ai';

export const SIDEBAR_ITEM = [
	{
		order: 1,
		icon: <BiBell />,
		wording: '追蹤名單',
		link: '/follow',
	},
	{
		order: 2,
		icon: <BiLike />,
		wording: '我按讚的文章',
		link: '/likes',
	},
	{
		order: 3,
		icon: <BiCoin />,
		wording: '儲值六角幣',
		link: '/shop',
	},
	{
		order: 4,
		icon: <BiDonateBlood />,
		wording: '贊助紀錄',
		link: '/donate-history',
	},
	{
		order: 5,
		icon: <BiCoinStack />,
		wording: '儲值紀錄',
		link: '/addValue-history',
	},
	{
		order: 6,
		icon: <AiOutlineMessage />,
		wording: '六角聊天室',
		link: '/chat',
	},
];
