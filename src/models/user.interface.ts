import { CommonResponseType } from './basic.interface';

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
	photo: string;
}

export interface LoginResponseType extends CommonResponseType {
	data: {
		token: string;
		user: {
			id?: string;
			name?: string;
			photo: string;
		};
	};
}

export interface EditProfileResponseType extends CommonResponseType {
	data: {
		name: string;
		photo: string;
		gender: 'male' | 'female' | 'x';
	};
}

export type LikesType = {
	_id: string;
	name: string;
	photo: string;
};

export interface LikeListResponseType extends CommonResponseType {
	data: {
		_id: string;
		userId: LikesType;
		createdAt: string;
	}[];
}
