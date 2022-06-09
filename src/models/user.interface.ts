import { CommonResponseType } from './basic.interface';

export interface UserFieldType {
	_id: string;
	name: string;
	gender?: string;
	avatar: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface RegisterParams extends LoginParams {
	name: string;
	confirmPassword: string;
}

export interface ResetPasswordParams {
	password: string;
	confirmPassword: string;
}

export interface EditProfileParams {
	name: string;
	gender: string;
	avatar: string;
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
