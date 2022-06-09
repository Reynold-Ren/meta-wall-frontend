import { CommonResponseType } from './basic.interface';

export interface OrderResponseType extends CommonResponseType {
	data: {
		MerchantId: string;
		TradeInfo: string;
		TradeSha: string;
		Version: string;
		[key: string]: string;
	};
}

export interface CreateOrderParams {
	email: string;
	amt: number;
	desc: string;
}
