import { UserFieldType } from './user.interface';
import { CommonResponseType } from './basic.interface';

export type SendMessageParamsType = {
	content: string;
};

export interface MessageType {
	_id?: string;
	content: string;
	userId: UserFieldType;
	createdAt: string;
}

export interface EnterRoomResponseType extends CommonResponseType {
	data: MessageType[];
}

export type EnterRoom = {
	socketId: string;
};

export type EnterRoomType = {
	avatar: string;
	name: string;
	enterAt: string;
};
