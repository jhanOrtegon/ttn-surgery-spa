// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import {
	type IFiltersFetchValidateInfoWebScrapper,
	type IResponseFetchValidateInfoWebScrapper,
} from './types';
import { type IErrorResponse } from '@/types';

// utils
import { hasData, convertKeysToCamelCase } from '@/utils';

const fetchValidateInfoWebScrapper = async (filters: IFiltersFetchValidateInfoWebScrapper) => {
	const response = await HTTP_MEDICAL.get<IResponseFetchValidateInfoWebScrapper>(
		'/appointment/validateInfoWebscrapper/',
		{
			params: filters,
		},
	);

	return {
		...response.data,
		results: convertKeysToCamelCase(response.data.results),
	};
};

export const useGetValidateInfoWebScrapper = (
	filters: IFiltersFetchValidateInfoWebScrapper,
	enabled = true,
) => {
	const query = useQuery({
		enabled,
		retry: 0,
		cacheTime: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['validateInfoWebScrapper', filters] : ['validateInfoWebScrapper'],
		queryFn: async () => await fetchValidateInfoWebScrapper(filters),
	});

	useHandleQueryStatus(query);

	const error = query.error as IErrorResponse;

	return { ...query, errorWS: error?.response?.data.errorWS };
};
