import { getCookie, getEnvs } from '@/utils';
import axios from 'axios';

const getBaseURL = (url: string) => {
	return {
		baseURL: url,
		headers: {
			Accept: 'application/json',
			Authorization: getCookie('data-biowel')?.token,
		},
	};
};

const { URL_GATEWAY, API_VERSION, URL_BASE, URL_PROTOCOL } = getEnvs();

export const HTTP_SECURITY = axios.create(
	getBaseURL(`${URL_PROTOCOL}${URL_BASE}${URL_GATEWAY}${API_VERSION}/security`),
);

export const HTTP_MEDICAL = axios.create(
	getBaseURL(`${URL_PROTOCOL}${URL_BASE}${URL_GATEWAY}${API_VERSION}/medical`),
);

export const HTTP_PAYROLL = axios.create(
	getBaseURL(`${URL_PROTOCOL}${URL_BASE}${URL_GATEWAY}${API_VERSION}/payroll`),
);

export const HTTP_ADMIN = axios.create(
	getBaseURL(`${URL_PROTOCOL}${URL_BASE}${URL_GATEWAY}${API_VERSION}/admin`),
);
