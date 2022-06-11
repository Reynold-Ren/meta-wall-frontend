import instance from '../apis/axios';
import { CommonResponseType } from './basic.interface';
import { PostResponseType } from './post.interface';

export interface UserFieldType {
	_id: string;
	name: string;
	gender?: string;
	avatar: string;
	coin: number;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface RegisterParams extends LoginParams {
	name: string;
	confirmPassword: string;
}

export interface UpdatePasswordParams {
	password: string;
	confirmPassword: string;
}

export interface EditProfileParams {
	name: string;
	gender: string;
	avatar: string;
}

export interface FollowUserParams {
	id: string | undefined;
}

export interface LoginResponseType extends CommonResponseType {
	data: {
		token: string;
		user: {
			id?: string;
			name?: string;
			avatar: string;
		};
	};
}

export interface EditProfileResponseType extends CommonResponseType {
	data: {
		name: string;
		avatar: string;
		gender: 'male' | 'female' | 'x';
	};
}

export interface LikeListResponseType extends CommonResponseType {
	data: {
		_id: string;
		userId: UserFieldType;
		createdAt: string;
	}[];
}

export interface FollowListResponseType extends CommonResponseType {
	data: {
		following: {
			user: UserFieldType;
			createdAt: string;
		}[];
	}[];
}

export interface FetchSpecUserResponseType extends CommonResponseType {
	data: {
		user: {
			_id: string;
			name: string;
			followers: [];
			avatar: string;
		};
		post: PostResponseType[];
	};
}

export interface ForgetPasswordParams {
	email: string;
}

export interface ResetPasswordParams extends UpdatePasswordParams {
	token: string;
}
