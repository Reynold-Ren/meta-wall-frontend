import { createContext, useContext, useState } from 'react';
import { useToken } from '../helpers/useToken';
import { User } from '../apis/apis';
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
		if (result.token) {
			const { _id, name, token } = result;
			useToken.setToken(JSON.stringify({ id: _id, name, token }));
			setUser({
				id: _id,
				name,
				token,
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
		if (result.token) {
			const { _id, name, token } = result;
			useToken.setToken(JSON.stringify({ id: _id, name, token }));
			setUser({
				id: _id,
				name,
				token,
			});
			successCallback();
		} else {
			failedCallback(result.message);
		}
	};

	const signout = (callback: VoidFunction) => {
		useToken.removeToken();
		setUser(null);
		callback();
	};

	const value = { user, setUser, signin, signup, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
