export interface LoginResponseType {
	status: boolean;
	message: string;
	_id?: string;
	name?: string;
	token: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface RegisterParams extends LoginParams {
	name: string;
	confirmPassword: string;
}
