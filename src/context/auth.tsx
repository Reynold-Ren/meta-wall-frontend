import { createContext, useContext, useState } from 'react';
import { User } from '../apis/apis';
import { useLocalStorage } from '../helpers/useLocalSotrage';
import { LoginParams, RegisterParams, SetCoinParams } from '../models/user.interface';
import defaultAvatar from '../assets/user_default.png';

interface AuthContextType {
	user: any;
	setUser: React.Dispatch<any>;
	setCoin: (params: SetCoinParams) => void;
	signin: (params: LoginParams, successCallback: VoidFunction, failedCallback: (msg: string) => void) => void;
	signup: (params: RegisterParams, successCallback: VoidFunction, failedCallback: (msg: string) => void) => void;
	signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<any>(null);

	const signin = async (params: LoginParams, successCallback: VoidFunction, failedCallback: (msg: string) => void) => {
		const result = await User.login(params);
		if (result.data?.token) {
			const { id, name, avatar, coin } = result.data.user;
			const userAvatar = avatar === '' ? defaultAvatar : avatar;
			useLocalStorage.setUser(JSON.stringify({ id, name, avatar: userAvatar, coin }));
			useLocalStorage.setToken(result.data.token);
			setUser({
				id,
				name,
				avatar: userAvatar,
				coin,
			});
			successCallback();
		} else {
			failedCallback(result.message);
		}
	};

	const signup = async (
		params: RegisterParams,
		successCallback: VoidFunction,
		failedCallback: (msg: string) => void,
	) => {
		const result = await User.register(params);
		if (result.data?.token) {
			const { id, name, avatar, coin } = result.data.user;
			const userAvatar = avatar === '' ? defaultAvatar : avatar;
			useLocalStorage.setUser(JSON.stringify({ id, name, avatar: userAvatar, coin }));
			useLocalStorage.setToken(result.data.token);
			setUser({
				id,
				name,
				avatar: userAvatar,
				coin,
			});
			successCallback();
		} else {
			failedCallback(result.message);
		}
	};

	const signout = (callback: VoidFunction) => {
		useLocalStorage.removeUser();
		useLocalStorage.removeToken();
		setUser(null);
		callback();
	};

	const setCoin = ({ coinNum }: SetCoinParams) => {
		setUser({
			...user,
			coin: user.coin + coinNum,
		});

		useLocalStorage.setUser(JSON.stringify({ ...user, coin: user.coin + coinNum }));
	};

	const value = { user, setUser, setCoin, signin, signup, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
