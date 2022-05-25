import { CommonResponseType } from './basic.interface';

export interface LoginParams {
	email: string;
	password: string;
}

export interface RegisterParams extends LoginParams {
	name: string;
	confirmPassword: string;
}

export interface LoginResponseType extends CommonResponseType {
	data: {
		_id?: string;
		name?: string;
		token: string;
	};
}
