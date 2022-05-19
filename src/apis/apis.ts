import axios from './axios';
import { useToken } from '../helpers/useToken';

const getAuth = (token: string): object => ({ headers: { Authorization: `Bearer ${token}` } });

export const register = (params: object = {}): object => axios.post('/user/create', params);
export const login = (params: object = {}): object => axios.post('/user/login', params);
export const getUserProfile = (): object => axios.get('/user/create', getAuth(useToken.getToken()));
export const updatePassword = (params: object = {}): object =>
	axios.post('/user/update_password', params, getAuth(useToken.getToken()));
export const updateUserInfo = (params: object = {}): object =>
	axios.patch('/user/profile', params, getAuth(useToken.getToken()));
