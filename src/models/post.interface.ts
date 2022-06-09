import { CommonResponseType } from './basic.interface';
import { userFieldType } from './user.interface';

export interface CreatePostParams {
	content: string;
	image?: string;
}

export interface PostResponseType extends CommonResponseType {
	data: {
		_id: string;
		name: string;
		content: string;
		image: string;
		likes?: string[];
		createdAt?: string;
	};
}

export interface FetchOnePostResponseType extends CommonResponseType {
	data: {
		userId: userFieldType;
		content: string;
		image: string;
		likes?: string[];
		createdAt?: string;
	};
}

export type FetchPostsType = Array<{
	_id: string;
	name: string;
	content: string;
	image: string;
	likes: string[];
}>;

export interface FetchPostsResponseType extends CommonResponseType {
	data: FetchPostsType;
}

export type LikesParamsType = {
	_id: string;
};

export type getOneParamsType = {
	id: string;
};
