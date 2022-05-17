import axios from 'axios';

const instance = axios.create({
	headers: {
		'Content-Type': 'application/json',
	},
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 3000,
});

export default instance;
