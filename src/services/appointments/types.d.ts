import { type IHttpResponse, type IHttpFilters, type IAppointment } from '@/types';

export interface IFiltersFetchAppointments extends IHttpFilters {
	idPatient?: number;
}

export interface IResponseFetchAppointments extends IHttpResponse {
	results: IAppointment[];
}
