import { CommonResponseType } from './basic.interface';
import { UserFieldType } from './user.interface';
import { CommentType } from './comment.interface';

export interface CreatePostParams {
	content: string;
	image?: string;
}

export interface CreatePostResponseType extends CommonResponseType {
	data: {
		id: string;
		content: string;
		image: string;
	};
}

export interface PostResponseType {
	_id: string;
	userId: UserFieldType;
	content: string;
	image: string;
	likes: string[];
	createdAt: string;
	comments: CommentType[];
}

export interface FetchOnePostResponseType extends CommonResponseType {
	data: PostResponseType;
}

export interface FetchPostsResponseType extends CommonResponseType {
	data: PostResponseType[];
}

export type LikesParamsType = {
	_id: string;
};

export type getOneParamsType = {
	id: string;
};
