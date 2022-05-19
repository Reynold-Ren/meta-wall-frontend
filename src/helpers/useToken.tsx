type UseTokenMethods = {
	setToken: (item: string) => void;
	getToken: () => string;
	exists: () => boolean;
	removeToken: () => void;
};

export const useToken: UseTokenMethods = {
	setToken: (item) => {
		localStorage.setItem('hex-token', JSON.stringify(item));
	},
	getToken: () => {
		let token: string = localStorage.getItem('hex-token') || '';
		return JSON.parse(token);
	},
	exists: () => {
		return !!localStorage.getItem('hex-token');
	},
	removeToken: () => {
		localStorage.removeItem('hex-token');
	},
};
