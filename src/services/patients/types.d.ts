import { type IHttpResponse, type IHttpFilters, type IPatient } from '@/types';

export interface IFiltersFetchPatients extends IHttpFilters {
	orderByType: string;
	filterPatient?: number;
	return?: boolean;
}

export interface IResponseFetchPatients extends IHttpResponse {
	results: IPatient[];
}

export interface IFiltersFetchInfoPatient extends IHttpFilters {
	id?: number;
}

export interface IResponseFetchInfoPatient extends IHttpResponse {
	results: IPatient;
}

export interface IPatientMutation {
	documentType?: number;
	documentNumber?: string | number;
	document?: string | number;
	firstName?: string | number;
	firstSurname?: string | number;
	secondSurname?: string | number;
	otherNames?: string | number;
	secondName?: string | number;
	lastName?: string | number;
	secondSurname?: string | number;
	gender?: string | number;
	birthDate?: string;
	homeAddress?: string;
	email?: string;
	cityId?: number;
	homephone?: string | number;
	phoneNumber?: string | number;
	cellphone?: string | number;
	whatsapp?: string | number;
	bloodType?: string | number;
	maritalStatus?: string | number;
	provinceId?: number;
	contracts?: IContract[];
	affiliationType?: string | number;
	affiliationTypeId?: number;
	affiliationTypeName?: string;
	address_zone?: string;
	age?: string | number;
	// alert?: string;
	// alertId?: null;
	cityName?: string;
	docType?: string | number;
	docTypeId?: number;
	// emergencyContact?: string | number;
	id?: number;
	neighborhood?: string | number;
	notes_num?: number;
	ocupation?: string | number;
	provinceName?: string | number;
	urlPhoto?: string | number;
	use_contact_lens?: string | number;
	use_glasses?: string | number;
	webscrapperValidated?: number;
	eaccount?: number;
}

export interface IContract {
	[x: string]: any;
	id?: string;
	companyTypeTag?: 'prepaid' | 'special_agreement' | 'particular' | '';
	corporateClientId?: number;
	contractId?: number;
	policy?: string;
	isMain: 0 | 1;
	populationId?: number;
	crtId?: number;
	wsValidated?: 0 | 1;
}
