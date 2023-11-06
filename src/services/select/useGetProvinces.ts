// axios
import { HTTP_ADMIN } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IResponseFetchProvinces, type IFiltersFetchProvinces } from './types';

// utils
import { hasData, convertKeysToCamelCase, addSelectionar } from '@/utils';

const fetchAffiliationTypes = async (
	filters: IFiltersFetchProvinces,
): Promise<IResponseFetchProvinces> => {
	const response = await HTTP_ADMIN.get<IResponseFetchProvinces>('/provinces/', {
		params: filters,
	});
	const results = convertKeysToCamelCase(
		response.data.data.map(province => ({
			...province,
			label: province.name,
			value: province.id,
		})),
	);

	addSelectionar(results);

	return { data: results };
};

export const useGetProvinces = (filters: IFiltersFetchProvinces, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['provinces', filters] : ['provinces'],
		queryFn: async () => await fetchAffiliationTypes(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
