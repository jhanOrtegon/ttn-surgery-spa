import { type IHttpResponse, type IHttpFilters, type IOrder } from '@/types';

export interface IFiltersFetchPendingOrders extends IHttpFilters {
	patient?: number;
	typeList?: 'orderPend';
}

export interface IResponseFetchPendingOrders extends IHttpResponse {
	results: IOrder[];
}
