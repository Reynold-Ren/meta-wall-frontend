type UseTokenMethods = {
	setToken: (item: string) => void;
	getToken: () => string;
	exists: () => boolean;
	removeToken: () => void;
};

export const useToken: UseTokenMethods = {
	setToken: (item) => {
		localStorage.setItem('hex-token', item);
	},
	getToken: () => {
		const user: string = localStorage.getItem('hex-token') || '';
		return user;
	},
	exists: () => {
		return !!localStorage.getItem('hex-token');
	},
	removeToken: () => {
		localStorage.removeItem('hex-token');
	},
};
