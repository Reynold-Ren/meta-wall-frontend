import { CommonResponseType } from './basic.interface';
import { UserFieldType } from './user.interface';

export interface DonateUserParams {
	coinNum: number;
	authorUserID: string;
}

export interface FetchListParams {
	id: string;
}

export interface FetchDonateListResponseType extends CommonResponseType {
	data: {
		_id: string;
		donatee: UserFieldType;
		donateNum: number;
		createdAt: string;
	}[];
}

export interface FetchDonateeListResponseType extends CommonResponseType {
	data: {
		_id: string;
		userId: UserFieldType;
		donatee: UserFieldType;
		donateNum: number;
		createdAt: string;
	}[];
}
