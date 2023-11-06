import { type IHttpResponse, type IHttpFilters, type IComment } from '@/types';

export interface IFiltersFetchComments extends IHttpFilters {
	id?: number;
	entity: 'userClient';
}

export interface IResponseFetchComments extends IHttpResponse {
	results: IComment[];
}

export interface ICreateCommentMutation {
	userId: number;
	entity: 'userClient';
	comment: string;
	id: number;
}
