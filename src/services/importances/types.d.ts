import { type IHttpResponse, type IHttpFilters } from '@/types';

export interface IFiltersFetchImportances extends IHttpFilters {
	description: string;
}

export interface IResponseFetchImportances extends IHttpResponse {
	results: { id: number };
}

export interface ICreateImportanceMutation {
	description: string;
}
