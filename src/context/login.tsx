import { createContext, useContext } from 'react';

type LoginContent = {
	[key: string]: () => void;
};

export const LoginContext = createContext<LoginContent>({});

export const useLoginContext = () => useContext(LoginContext);
