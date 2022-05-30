type UseLocalStorageMethods = {
	getToken: () => string;
	setToken: (token: string) => void;
	getUser: () => string;
	setUser: (user: string) => void;
	updateUser: (user: { name: string; photo: string }) => void;
	tokenIsExists: () => boolean;
	removeUser: () => void;
	removeToken: () => void;
};

export const useLocalStorage: UseLocalStorageMethods = {
	getToken: () => {
		const token = localStorage.getItem('hex-token') || '';

		return token;
	},
	setToken: (token) => {
		localStorage.setItem('hex-token', token);
	},
	getUser: () => {
		const user: string = localStorage.getItem('hex-user') || '';
		return user;
	},
	setUser: (user) => {
		localStorage.setItem('hex-user', user);
	},
	updateUser: (user) => {
		const oldData: string = localStorage.getItem('hex-user') || '';
		const jsonfyData = JSON.parse(oldData);
		const mergeUserData = { ...jsonfyData, ...user };

		localStorage.setItem('hex-user', JSON.stringify(mergeUserData));
	},
	tokenIsExists: () => {
		const token = localStorage.getItem('hex-token') || '';

		return !!token;
	},
	removeUser: () => {
		localStorage.removeItem('hex-user');
	},
	removeToken: () => {
		localStorage.removeItem('hex-token');
	},
};
