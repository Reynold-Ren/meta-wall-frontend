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

export interface FetchAddValueListResponseType extends CommonResponseType {
	data: {
		_id: string;
		tradeNo: string;
		amt: number;
		paymentType: string;
		payTime: number;
		IP: string;
		payment_status: number;
	}[];
}
