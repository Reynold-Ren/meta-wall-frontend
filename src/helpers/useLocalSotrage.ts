type UseLocalStorageMethods = {
	getToken: () => string;
	setUser: (user: string) => void;
	getUser: () => string;
	tokenIsExists: () => boolean;
	removeUser: () => void;
};

export const useLocalStorage: UseLocalStorageMethods = {
	getToken: () => {
		const userData = localStorage.getItem('hex-user') || '';
		const token = userData !== '' ? JSON.parse(userData).token : '';

		return token;
	},
	setUser: (user) => {
		localStorage.setItem('hex-user', user);
	},
	getUser: () => {
		const user: string = localStorage.getItem('hex-user') || '';
		return user;
	},
	tokenIsExists: () => {
		const userData = localStorage.getItem('hex-user') || '';
		const token = userData !== '' ? JSON.parse(userData).token : '';

		return !!token;
	},
	removeUser: () => {
		localStorage.removeItem('hex-user');
	},
};
