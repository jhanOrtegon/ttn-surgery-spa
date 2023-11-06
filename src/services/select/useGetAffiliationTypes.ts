// axios
import { HTTP_MEDICAL } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IResponseFetchAffiliationTypes, type IFiltersFetchAffiliationTypes } from './types';

// utils
import { hasData, convertKeysToCamelCase, addSelectionar } from '@/utils';

const fetchAffiliationTypes = async (
	filters: IFiltersFetchAffiliationTypes,
): Promise<IResponseFetchAffiliationTypes> => {
	const response = await HTTP_MEDICAL.get<IResponseFetchAffiliationTypes>(
		'/generals/affiliation-types/',
		{
			params: filters,
		},
	);

	const results = convertKeysToCamelCase(
		response.data.results.map(affiliation => ({
			...affiliation,
			label: affiliation.affiliationTypeName,
			value: affiliation.affiliationTypeId,
		})),
	);

	addSelectionar(results);

	return {
		...response.data,
		results,
	};
};

export const useGetAffiliationTypes = (filters: IFiltersFetchAffiliationTypes, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['affiliationTypes', filters] : ['affiliationTypes'],
		queryFn: async () => await fetchAffiliationTypes(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
