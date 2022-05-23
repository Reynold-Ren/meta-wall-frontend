import instance from './axios';
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { useToken } from '../helpers/useToken';
import { LoginParams, LoginResponseType, RegisterParams } from '../models/user.interface';

const getAuth = (token: string): object => ({ headers: { Authorization: `Bearer ${token}` } });

const responseBody = (response: AxiosResponse) => response.data.data;
const errorBody = (error: AxiosError) => error.response?.data;

const request = {
	get: (url: string) => instance.get(url).then(responseBody).catch(errorBody),
	post: (url: string, body: any, headers?: AxiosRequestConfig) =>
		instance.post(url, body, headers).then(responseBody).catch(errorBody),
	put: (url: string, body: any) => instance.put(url, body).then(responseBody).catch(errorBody),
	delete: (url: string) => instance.delete(url).then(responseBody).catch(errorBody),
};

export const User = {
	login: (params: LoginParams): Promise<LoginResponseType> => request.post('/user/login', params),
	register: (params: RegisterParams): Promise<LoginResponseType> => request.post('/user/create', params),
};
