import { type IContract } from '.';

export interface IOrder {
	appAssign?: number;
	appBgColor?: string;
	appFontColor?: string;
	appStatus?: string;
	bodyOrgan?: string;
	contracts?: IContract;
	createdAt?: string;
	cup?: string;
	dateSuggested?: string;
	dateValidity?: string;
	fullnameMedical?: string;
	id?: number;
	idSer?: number;
	observation?: string;
	offeredService?: string;
	orderDate?: string;
	ortTag?: string;
	serviceId?: number;
	serviceType?: string;
	sorId?: number;
}
