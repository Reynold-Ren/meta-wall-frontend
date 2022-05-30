import { createContext, useContext, useState } from 'react';
import { User } from '../apis/apis';
import { useLocalStorage } from '../helpers/useLocalSotrage';
import { LoginParams, RegisterParams } from '../models/user.interface';

interface AuthContextType {
	user: any;
	setUser: React.Dispatch<any>;
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
			const { id, name, photo } = result.data.user;
			useLocalStorage.setUser(JSON.stringify({ id, name, photo }));
			useLocalStorage.setToken(result.data.token);
			setUser({
				id,
				name,
				photo,
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
			const { id, name, photo } = result.data.user;
			useLocalStorage.setUser(JSON.stringify({ id, name, photo }));
			useLocalStorage.setToken(result.data.token);
			setUser({
				id,
				name,
				photo,
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

	const value = { user, setUser, signin, signup, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
