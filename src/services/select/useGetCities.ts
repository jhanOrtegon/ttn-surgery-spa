// axios
import { HTTP_ADMIN } from '@/config/axios';

// react-query
import { useQuery } from '@tanstack/react-query';

// hooks
import { useHandleQueryStatus } from '@/hooks';

// types
import { type IResponseFetchCities, type IFiltersFetchCities } from './types';

// utils
import { hasData, convertKeysToCamelCase, addSelectionar } from '@/utils';

const fetchCities = async (filters: IFiltersFetchCities): Promise<IResponseFetchCities> => {
	const response = await HTTP_ADMIN.get<IResponseFetchCities>('/cities/', {
		params: filters,
	});
	const results = convertKeysToCamelCase(
		response.data.data.map(city => ({
			...city,
			label: city.name,
			value: city.id,
		})),
	);

	addSelectionar(results);

	return { data: results };
};

export const useGetCities = (filters: IFiltersFetchCities, enabled = true) => {
	const query = useQuery({
		enabled,
		retry: 0,
		refetchOnWindowFocus: false,
		queryKey: hasData(filters) ? ['cities', filters] : ['cities'],
		queryFn: async () => await fetchCities(filters),
	});

	useHandleQueryStatus(query);

	return { ...query };
};
