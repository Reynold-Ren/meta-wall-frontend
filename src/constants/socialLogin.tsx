import { FaLine, FaDiscord } from 'react-icons/fa';
import { AiFillGoogleSquare } from 'react-icons/ai';
import { IoLogoFacebook } from 'react-icons/io';

const API_URL = process.env.REACT_APP_API_URL;

export const SOCIAL_LOGIN_ITEM = [
	{
		title: 'google',
		link: `${API_URL}/user/google`,
		icon: <AiFillGoogleSquare />,
	},
	{
		title: 'facebook',
		link: `${API_URL}/user/facebook`,
		icon: <IoLogoFacebook />,
	},
	{
		title: 'line',
		link: `${API_URL}/user/line`,
		icon: <FaLine />,
	},
	{
		title: 'discord',
		link: `${API_URL}/user/discord`,
		icon: <FaDiscord />,
	},
];
