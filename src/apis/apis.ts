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
	LikeListResponseType,
	FollowListResponseType,
	FollowUserParams,
	FetchSpecUserResponseType,
} from '../models/user.interface';
import {
	CreatePostParams,
	PostResponseType,
	CreatePostResponseType,
	FetchPostsResponseType,
	LikesParamsType,
	getOneParamsType,
	FetchOnePostResponseType,
} from '../models/post.interface';
import { OrderResponseType, CreateOrderParams } from '../models/order.interface';
import { CreateCommentParams, CommentResponseType } from '../models/comment.interface';

const getAuth = (token: string): object => ({
	headers: { Authorization: `Bearer ${token}` },
});

const paramsToQuery = (params: { [key: string]: any } = {}) => {
	if (Object.keys(params).length !== 0) {
		return Object.keys(params)
			.map((key) => key + '=' + params[key])
			.join('&');
	}
	return '';
};

const responseBody = (response: AxiosResponse) => response.data;
const errorBody = (error: AxiosError) => error.response?.data;

const request = {
	get: (url: string, headers?: AxiosRequestConfig) =>
		instance
			.get(url, { ...headers })
			.then(responseBody)
			.catch(errorBody),
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
	getLikesList: (): Promise<LikeListResponseType> =>
		request.get('/user/getLikesList/', getAuth(useLocalStorage.getToken())),
	getFollowList: (): Promise<FollowListResponseType> =>
		request.get('/user/getFollowList/', getAuth(useLocalStorage.getToken())),
	follow: (params: FollowUserParams): Promise<CommonResponseType> =>
		request.post(`${params.id}/follow`, {}, getAuth(useLocalStorage.getToken())),
	unFollow: (params: FollowUserParams): Promise<CommonResponseType> =>
		request.delete(`${params.id}/unfollow`, {}, getAuth(useLocalStorage.getToken())),
};

export const Posts = {
	create: (params: CreatePostParams): Promise<CreatePostResponseType> =>
		request.post('/posts/create', params, getAuth(useLocalStorage.getToken())),
	getAll: (params?: { [key: string]: any }): Promise<FetchPostsResponseType> =>
		request.get(`/posts?${paramsToQuery(params)}`, getAuth(useLocalStorage.getToken())),
	getOne: (params: getOneParamsType): Promise<FetchOnePostResponseType> =>
		request.get(`/posts/${params.id}`, getAuth(useLocalStorage.getToken())),
	addLike: (params: LikesParamsType): Promise<CommonResponseType> =>
		request.post(`/posts/${params._id}/likes`, params, getAuth(useLocalStorage.getToken())),
	unLike: (params: LikesParamsType): Promise<CommonResponseType> =>
		request.delete(`/posts/${params._id}/likes`, params, getAuth(useLocalStorage.getToken())),
	getSpecUser: (params: getOneParamsType): Promise<FetchSpecUserResponseType> =>
		request.get(`/user/profile/${params.id}`, getAuth(useLocalStorage.getToken())),
};

export const Comment = {
	create: (params: CreateCommentParams): Promise<CommentResponseType> =>
		request.post(`/posts/${params.postID}/comment`, { comment: params.comment }, getAuth(useLocalStorage.getToken())),
};

export const Order = {
	create: (params: CreateOrderParams): Promise<OrderResponseType> =>
		request.post('/donate/', params, getAuth(useLocalStorage.getToken())),
};

export const upload = (params: any): Promise<CommonResponseType> =>
	request.post('/upload', params, getAuth(useLocalStorage.getToken()));
