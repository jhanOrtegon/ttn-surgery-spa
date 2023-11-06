// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IResponseFetchCompanyTypes, type IFiltersFetchCompanyTypes } from './types';

// utils
import { hasData, convertKeysToCamelCase, addSelectionar } from '@/utils';

const fetchCompanyTypes = async (
	filters: IFiltersFetchCompanyTypes,
): Promise<IResponseFetchCompanyTypes> => {
	const response = await HTTP_MEDICAL.get<IResponseFetchCompanyTypes>('/client/', {
		params: filters,
	});

	const results = convertKeysToCamelCase(
		response.data.results.map(company => ({
			...company,
			label: company.name,
			value: company.id,
		})),
	);

	addSelectionar(results);

	return {
		...response.data,
		results,
	};
};

export const useGetCompanyTypes = (filters: IFiltersFetchCompanyTypes, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['companyTypes', filters] : ['companyTypes'],
		queryFn: async () => await fetchCompanyTypes(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
