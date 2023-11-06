import { type IHttpResponse, type IHttpFilters, type IValidateInfoWebScrapper } from '@/types';

export interface IFiltersFetchValidateInfoWebScrapper extends IHttpFilters {
	modality?: string;
	doc?: string;
	docType?: string;
	entityId?: number;
	entityType?: string;
	id?: number;
}

export interface IResponseFetchValidateInfoWebScrapper extends IHttpResponse {
	results: IValidateInfoWebScrapper;
}
