import instance from './axios';
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { useLocalStorage } from '../helpers/useLocalSotrage';
import { CommonResponseType } from '../models/basic.interface';
import {
	LoginParams,
	LoginResponseType,
	RegisterParams,
	ResetPasswordParams,
	EditProfileParams,
	EditProfileResponseType,
} from '../models/user.interface';
import { CreatePostParams, PostResponseType, FetchPostResponseType, LikesParamsType } from '../models/post.interface';

const getAuth = (token: string): object => ({
	headers: { Authorization: `Bearer ${token}` },
});

const responseBody = (response: AxiosResponse) => response.data;
const errorBody = (error: AxiosError) => error.response?.data;

const request = {
	get: (url: string) => instance.get(url).then(responseBody).catch(errorBody),
	post: (url: string, body: any, headers?: AxiosRequestConfig) =>
		instance.post(url, body, headers).then(responseBody).catch(errorBody),
	patch: (url: string, body: any, headers?: AxiosRequestConfig) =>
		instance.patch(url, body, headers).then(responseBody).catch(errorBody),
	put: (url: string, body: any) => instance.put(url, body).then(responseBody).catch(errorBody),
	delete: (url: string, body: any, headers?: AxiosRequestConfig) =>
		instance
			.delete(url, { data: body, ...headers })
			.then(responseBody)
			.catch(errorBody),
};

export const User = {
	login: (params: LoginParams): Promise<LoginResponseType> => request.post('/user/login', params),
	register: (params: RegisterParams): Promise<LoginResponseType> => request.post('/user/create', params),
	resetPassword: (params: ResetPasswordParams): Promise<CommonResponseType> =>
		request.post('/user/update_password', params, getAuth(useLocalStorage.getToken())),
	editProfile: (params: EditProfileParams): Promise<EditProfileResponseType> =>
		request.patch('/user/profile', params, getAuth(useLocalStorage.getToken())),
};

export const Posts = {
	create: (params: CreatePostParams): Promise<PostResponseType> =>
		request.post('/posts/create', params, getAuth(useLocalStorage.getToken())),
	getAll: (): Promise<FetchPostResponseType> => request.get('/posts/'),
	addLike: (params: LikesParamsType): Promise<CommonResponseType> =>
		request.post(`/posts/${params._id}/likes`, params, getAuth(useLocalStorage.getToken())),
	unLike: (params: LikesParamsType): Promise<CommonResponseType> =>
		request.delete(`/posts/${params._id}/likes`, params, getAuth(useLocalStorage.getToken())),
};

export const upload = (params: any): Promise<CommonResponseType> =>
	request.post('/upload', params, getAuth(useLocalStorage.getToken()));
