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
		_id?: string;
		name?: string;
		token: string;
	};
}

export interface EditProfileResponseType extends CommonResponseType {
	data: {
		name: string;
		photo: string;
		gender: 'male' | 'female' | 'x';
	};
}
