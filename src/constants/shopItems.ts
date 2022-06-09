import coinIcon from '../assets/icon/coinIcon.svg';
import moneyBagIcon from '../assets/icon/moneybagIcon.svg';
import banknotesIcon from '../assets/icon/banknotesIcon.svg';

type ShopItemAttrs = {
	title: string;
	icon: string;
	coinNum: string;
	price: number;
	itemDesc: string;
};

export const SHOP_ITEMS: ShopItemAttrs[] = [
	{
		title: '入門款',
		icon: coinIcon,
		coinNum: '30+5',
		price: 100,
		itemDesc: '六角幣 - 入門款',
	},
	{
		title: '經典款',
		icon: moneyBagIcon,
		coinNum: '300+20',
		price: 900,
		itemDesc: '六角幣 - 經典款',
	},
	{
		title: '豪華款',
		icon: banknotesIcon,
		coinNum: '1200+90',
		price: 1490,
		itemDesc: '六角幣 - 豪華款',
	},
];
