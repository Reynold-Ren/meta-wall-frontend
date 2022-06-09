import { CommonResponseType } from './basic.interface';

type CommentUser = {
	_id: string;
	name: string;
	avatar: string;
};

export interface CommentType {
	_id: string;
	user: CommentUser;
	comment: string;
	post: string;
	createdAt: string;
}

export interface CreateCommentParams {
	postID: string;
	comment: string;
}

export interface CommentResponseType extends CommonResponseType {
	data: CommentType;
}
