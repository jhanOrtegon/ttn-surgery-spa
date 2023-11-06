import {
	type IAffiliationType,
	type documentType,
	type IHttpResponse,
	type IHttpFilters,
	type IProvince,
	type ICity,
	type ICopaymentRate,
	type ICompanyType,
	type IContractpopulation,
	type IClientContract,
	type IImportance,
} from '@/types';

// ----------- DocumentType
export interface IResponseDocumentTypes extends IHttpResponse {
	results: documentType[];
}

// ----------- AffiliationType
export interface IResponseFetchAffiliationTypes extends IHttpResponse {
	results: IAffiliationType[];
}

export interface IFiltersFetchAffiliationTypes extends IHttpFilters {}

// ----------- Provinces
export interface IResponseFetchProvinces {
	data: IProvince[];
}

export interface IFiltersFetchProvinces extends IHttpFilters {
	entity_account: number;
}

// ----------- Cities
export interface IResponseFetchCities {
	data: ICity[];
}

export interface IFiltersFetchCities extends IHttpFilters {
	entity_account: number;
	province?: number;
}

// ----------- CopaymentRate
export interface IResponseFetchCopaymentRate {
	results: ICopaymentRate[];
}

export interface IFiltersFetchCopaymentRate extends IHttpFilters {
	search?: string;
	corpclientId?: number;
	year?: number;
	status?: 'enabled' | 'disabled';
}

// ----------- CompanyTypes
export interface IResponseFetchCompanyTypes {
	results: ICompanyType[];
}

export interface IFiltersFetchCompanyTypes extends IHttpFilters {
	contractCompanyType?: 'prepaid' | 'special_agreement' | 'eps';
	status?: 'enabled' | 'disabled';
}

// ----------- ContractPopulation
export interface IResponseFetchContractPopulation {
	results: IContractpopulation[];
}

export interface IFiltersFetchContractPopulation extends IHttpFilters {
	contract: string | number;
	status: 'enabled' | 'disabled';
}

// ----------- Contracts
export interface IResponseFetchClientContract {
	results: IClientContract[];
}

export interface IFiltersFetchClientContract extends IHttpFilters {
	client?: number;
	cType?: 'prepaid' | 'special_agreement' | 'eps';
	status: 'enabled' | 'disabled';
}

// ----------- Importances

export interface IFiltersFetchImportances extends IHttpFilters {}

export interface IResponseFetchImportances extends IHttpResponse {
	results: IImportance[];
}
